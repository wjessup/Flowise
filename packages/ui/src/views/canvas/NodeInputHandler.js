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

const // Define a new component to handle input parameters from nodes
const InputParamComponent = React.memo(({ inputParam, data, onChange }) => {

    const handleInputChange = useCallback((value) => {
        onChange(inputParam.name, value)
    }, [onChange, inputParam.name])

    if (inputParam.type === 'file') {
        return (
            <FileComponent
                fileType={inputParam.fileType || '*'}
                onChange={handleInputChange}
                value={data.inputs[inputParam.name] ?? inputParam.default ?? ''}
            />
        )
    }

    if (inputParam.type === 'string' || inputParam.type === 'password' || inputParam.type === 'number') {
        return (
            <InputComponent
                inputParam={inputParam}
                onChange={handleInputChange}
                value={data.inputs[inputParam.name] ?? inputParam.default ?? ''}
            />
        )
    }

    if (inputParam.type === 'options') {
        return (
            <DropdownComponent
                name={inputParam.name}
                options={inputParam.options}
                onSelect={handleInputChange}
                value={data.inputs[inputParam.name] ?? inputParam.default ?? ''}
            />
        )
    }

    return null
})

// The NodeInputHandler component can now focus only on rendering input handles and CustomWidthTooltip
const NodeInputHandler = React.memo(({ inputAnchor, inputParam, data, disabled = false }) => {
    const theme = useTheme()
    const ref = useRef(null)
    const updateNodeInternals = useUpdateNodeInternals()
    const [position, setPosition] = useState(0)
    const { reactFlowInstance } = useContext(flowContext)

    useEffect(() => {
        if (ref.current && ref.current.offsetTop && ref.current.clientHeight) {
            setPosition(ref.current.offsetTop + ref.current.clientHeight / 2)
            updateNodeInternals(data.id)
        }
    }, [data.id, ref, updateNodeInternals])

    useEffect(() => {
        updateNodeInternals(data.id)
    }, [data.id, position, updateNodeInternals])

    const handleInputChange = useCallback((name, value) => {
        const newInputs = {
            ...data.inputs,
            [name]: value
        }

        setData({ ...data, inputs: newInputs })
    }, [data])

    const { inputs } = data

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
                <InputParamComponent
                    inputParam={inputParam}
                    data={data}
                    onChange={handleInputChange}
                />
            )}
        </div>
    )
})

NodeInputHandler.propTypes = {
    inputAnchor: PropTypes.object,
    inputParam: PropTypes.object,
    data: PropTypes.object,
    disabled: PropTypes.bool
}

export default NodeInputHandler
