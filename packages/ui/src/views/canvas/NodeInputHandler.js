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

const const getNodePosition = (ref) => {
    if (ref.current && ref.current.offsetTop && ref.current.clientHeight) {
        return ref.current.offsetTop + ref.current.clientHeight / 2;
    }
    return 0;
};

const useUpdateNodeData = (id) => {
    const updateNodeInternals = useUpdateNodeInternals();
    useEffect(() => {
        updateNodeInternals(id);
    }, [id, updateNodeInternals]);
};

const FileInput = ({ data, inputParam, disabled = false }) => {
    const updateValue = (newValue) => {
        const updatedInputs = { ...data.inputs };
        updatedInputs[inputParam.name] = newValue;
        data.inputs = updatedInputs;
    };

    return (
        <File
            disabled={disabled}
            fileType={inputParam.fileType || "*"}
            onChange={updateValue}
            value={data.inputs[inputParam.name] ?? inputParam.default ?? "Choose a file to upload"}
        />
    );
};

const StringInput = ({ data, inputParam, disabled = false }) => {
    const updateValue = (newValue) => {
        const updatedInputs = { ...data.inputs };
        updatedInputs[inputParam.name] = newValue;
        data.inputs = updatedInputs;
    };

    return (
        <Input
            disabled={disabled}
            inputParam={inputParam}
            onChange={updateValue}
            value={data.inputs[inputParam.name] ?? inputParam.default ?? ""}
        />
    );
};

const OptionsInput = ({ data, inputParam, disabled = false }) => {
    const updateValue = (newValue) => {
        const updatedInputs = { ...data.inputs };
        updatedInputs[inputParam.name] = newValue;
        data.inputs = updatedInputs;
    };

    return (
        <Dropdown
            disabled={disabled}
            name={inputParam.name}
            options={inputParam.options}
            onSelect={updateValue}
            value={data.inputs[inputParam.name] ?? inputParam.default ?? "chose an option"}
        />
    );
};

const NodeInputHandler = ({ inputAnchor, inputParam, data, disabled = false }) => {
    const theme = useTheme();
    const ref = useRef(null);
    const position = getNodePosition(ref);

    useUpdateNodeData(data.id);

    const nodeInputDOM = inputAnchor && (
        <>
            <CustomWidthTooltip placement="left" title={inputAnchor.type}>
                <Handle
                    type="target"
                    position={Position.Left}
                    key={inputAnchor.id}
                    id={inputAnchor.id}
                    isValidConnection={(connection) => isValidConnection(connection, ReactFlowInstance)}
                    style={{
                        height: 10,
                        width: 10,
                        backgroundColor: data.selected ? theme.palette.primary.main : theme.palette.text.secondary,
                        top: position,
                    }}
                />
            </CustomWidthTooltip>
            <Box sx={{ p: 2 }}>
                <Typography>
                    {inputAnchor.label}
                    {!inputAnchor.optional && <span style={{ color: "red" }}>&nbsp;*</span>}
                </Typography>
            </Box>
        </>
    ) || (
        inputParam && (
            <Box sx={{ p: 2 }}>
                <Typography>
                    {inputParam.label}
                    {!inputParam.optional && <span style={{ color: "red" }}>&nbsp;*</span>}
                </Typography>
                {inputParam.type === "file" && <FileInput data={data} inputParam={inputParam} disabled={disabled} />}
                {["string", "password", "number"].includes(inputParam.type) && (
                    <StringInput data={data} inputParam={inputParam} disabled={disabled} />
                )}
                {inputParam.type === "options" && <OptionsInput data={data} inputParam={inputParam} disabled={disabled} />}
            </Box>
        )
    );

    return <div ref={ref}>{nodeInputDOM}</div>;
};

NodeInputHandler.propTypes = {
    inputAnchor: PropTypes.object,
    inputParam: PropTypes.object,
    data: PropTypes.object,
    disabled: PropTypes.bool
}

export default NodeInputHandler
