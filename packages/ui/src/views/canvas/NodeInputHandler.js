import PropTypes from 'prop-types'
import { Handle, Position, useUpdateNodeInternals } from 'reactflow'
import { useEffect, useRef, useState, useContext } from 'react'

// material-ui
import { useTheme, styled } from '@mui/material/styles'
import { Box, Typography, Tooltip } from '@mui/material'
import { tooltipClasses } from '@mui/material/Tooltip'
import { Dropdown } from 'ui-component/dropdown/Dropdown'
import { Input } from 'ui-component/input/Input'
import { File } from 'ui-component/file/File'
import { flowContext } from 'store/context/ReactFlowContext'
import { isValidConnection } from 'utils/genericHelper'

const CustomWidthTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 500
    }
})

// ===========================|| NodeInputHandler ||=========================== //

const const NodeInputHandler = ({ inputAnchor, inputParam, data, disabled = false }) => {
    const theme = useTheme()
    const ref = useRef()
    const { reactFlowInstance } = useContext(flowContext)

    const updateNodeInternals = useCallback(() => {
        updateNodeInternals(data.id)
    }, [data.id, updateNodeInternals])

    useEffect(() => {
        const element = ref.current;
        if (element) {
            setPosition(ref.current.offsetTop + ref.current.clientHeight / 2)
            updateNodeInternals(data.id)

            const handleResize = debounce(() => { setPosition(ref.current.offsetTop + ref.current.clientHeight / 2)}, 500);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [data.id, ref, theme.palette.primary.main, theme.palette.text.secondary, updateNodeInternals]);

    let inputComponent = null;

    if (inputParam) {
        const inputDefault = inputParam.default;
        const inputValue = data.inputs[inputParam.name];
        const combinedValue = inputValue || inputDefault || '';

        const onChangeHandler = newValue => {
            data.inputs[inputParam.name] = newValue;
            updateNodeInternals();
        }

        switch (inputParam.type) {
            case 'file':
                inputComponent = (
                    <File
                        disabled={disabled}
                        fileType={inputParam.fileType || '*'}
                        value={combinedValue}
                        onChange={newValue => onChangeHandler(newValue)}
                    />
                );
                break;
            case 'string':
            case 'password':
                inputComponent = (
                    <Input
                        disabled={disabled}
                        inputParam={inputParam}
                        value={combinedValue}
                        onChange={newValue => onChangeHandler(newValue)}
                        type={inputParam.type === 'password' ? 'password' : 'text'}
                    />
                );
                break;
            case 'number':
                inputComponent = (
                    <Input
                        disabled={disabled}
                        inputParam={inputParam}
                        value={combinedValue}
                        onChange={newValue => onChangeHandler(+newValue)}
                        type='number'
                    />
                );
                break;
            case 'options':
                inputComponent = (
                    <Dropdown
                        disabled={disabled}
                        name={inputParam.name}
                        value={combinedValue}
                        options={inputParam.options}
                        onSelect={newValue => onChangeHandler(newValue)}
                    />
                );
                break;
            default:
                break;
        }
    }

    return (
        <div ref={ref}>
            {inputAnchor && (
                <>
                    <CustomWidthTooltip placement='left' title={inputAnchor.type}>
                        <Handle
                            type='target'
                            position={Position.Left}
                            key={inputAnchor.id}
                            id={inputAnchor.id}
                            isValidConnection={connection => isValidConnection(connection, reactFlowInstance)}
                            style={{
                                height: 10,
                                width: 10,
                                backgroundColor: data.selected ? theme.palette.primary.main : theme.palette.text.secondary,
                                top: position
                            }}
                        />
                    </CustomWidthTooltip>
                    <Box sx={{ p: 2 }}>
                        <Typography>
                            {inputAnchor.label}
                            {!inputAnchor.optional && <span style={{ color: 'red' }}>&nbsp;*</span>}
                        </Typography>
                    </Box>
                </>
            )}

            {inputParam && (
                <Box sx={{ p: 2 }}>
                    <Typography>
                        {inputParam.label}
                        {inputParam.optional === false && <span style={{ color: 'red' }}>&nbsp;*</span>}
                    </Typography>
                    {inputComponent}
                </Box>
            )}
        </div>
    );
};

NodeInputHandler.propTypes = {
    inputAnchor: PropTypes.object,
    inputParam: PropTypes.object,
    data: PropTypes.object,
    disabled: PropTypes.bool
}

export default NodeInputHandler
