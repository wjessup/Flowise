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

const // Helper function to update node internals
const updateNode = (id, ref, updateNodeInternals) => {
    if (ref && ref.current) {
        const position = ref.current.offsetTop + ref.current.clientHeight / 2;
        setPosition(position);
        updateNodeInternals(id);
    }
}

const getInputType = (inputParam) => {
    const {name, type, default: defaultValue, fileType, optional, label, options} = inputParam;

    switch (type) {
        case 'file':
            return (
                <File
                    fileType={fileType || '*'}
                    onChange={(newValue) => setInputs(prev => ({ ...prev, [name]: newValue }))}
                    value={inputs[name] ?? defaultValue ?? 'Choose a file to upload'}
                    {...{disabled}}
                />
            );
        case 'string':
        case 'password':
        case 'number':
            return (
                <Input
                    inputParam={inputParam}
                    onChange={(newValue) => setInputs(prev => ({ ...prev, [name]: newValue }))}
                    value={inputs[name] ?? defaultValue ?? ''}
                    {...{disabled}}
                />
            );
        case 'options':
            return (
                <Dropdown
                    name={name}
                    options={options}
                    onSelect={(newValue) => setInputs(prev => ({ ...prev, [name]: newValue }))}
                    value={inputs[name] ?? defaultValue ?? 'chose an option'}
                    {...{disabled}}
                />
            );
        default:
            return null;
    }
}

const NodeInputHandler = ({ inputAnchor, inputParam, data, disabled = false }) => {
    const theme = useTheme();
    const ref = useRef(null);
    const [position, setPosition] = useState(0);
    const { reactFlowInstance } = useContext(flowContext);
    const [inputs, setInputs] = useState(data.inputs)

    useEffect(() => {
        updateNode(data.id, ref, useUpdateNodeInternals);
    }, [data.id, ref]);

    useEffect(() => {
        updateNode(data.id, ref, useUpdateNodeInternals);
    }, [inputs, ref]);

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
                            isValidConnection={(connection) => isValidConnection(connection, reactFlowInstance)}
                            style={{
                                height: 10,
                                width: 10,
                                backgroundColor: data.selected ? theme.palette.primary.main : theme.palette.text.secondary,
                                top: ref.current ? ref.current.offsetTop + ref.current.clientHeight / 2 : 0,
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

            {inputParam &&
                <Box sx={{ p: 2 }}>
                    <Typography>
                        {inputParam.label}
                        {!inputParam.optional && <span style={{ color: 'red' }}>&nbsp;*</span>}
                    </Typography>

                    {getInputType(inputParam)}
                </Box>
            }
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
