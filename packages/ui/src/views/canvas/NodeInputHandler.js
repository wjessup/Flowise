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
  const theme = useTheme();
  const ref = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [position, setPosition] = useState(0);
  const { reactFlowInstance } = useContext(flowContext);

  const handleUpdateNodeInternal = useCallback(() => {
    if (ref.current?.offsetTop && ref.current?.clientHeight) {
      setPosition(ref.current.offsetTop + ref.current.clientHeight / 2);
    }
  }, [ref]);

  useEffect(() => {
    updateNodeInternals(data.id);
  }, [data.id, updateNodeInternals]);

  useEffect(() => {
    handleUpdateNodeInternal();
    updateNodeInternals(data.id);
  }, [data.id, handleUpdateNodeInternal, updateNodeInternals]);

  const renderInputAnchor = () => {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>
          {inputAnchor.label}
          {!inputAnchor.optional && (
            <span style={{ color: "red" }}>&nbsp;*</span>
          )}
        </Typography>
      </Box>
    );
  };

  const renderHandle = () => {
    return (
      <CustomWidthTooltip placement="left" title={inputAnchor.type}>
        <Handle
          type="target"
          position={Position.Left}
          key={inputAnchor.id}
          id={inputAnchor.id}
          isValidConnection={(connection) =>
            isValidConnection(connection, reactFlowInstance)
          }
          sx={{
            height: 10,
            width: 10,
            backgroundColor: data.selected
              ? theme.palette.primary.main
              : theme.palette.text.secondary,
            top: position
          }}
        />
      </CustomWidthTooltip>
    );
  };

  const renderAnchorAndHandle = () => {
    if (!inputAnchor) return null;
    return (
      <>
        {renderHandle()}
        {renderInputAnchor()}
      </>
    );
  };

  const renderInputParam = () => {
    if (!inputParam) return null;

    const changeInputParamValue = (newValue) => {
      data.inputs[inputParam.name] = newValue;
      updateNodeInternals(data.id);
    };

    return (
      <>
        <Box sx={{ p: 2 }}>
          <Typography>
            {inputParam.label}
            {!inputParam.optional && (
              <span style={{ color: "red" }}>&nbsp;*</span>
            )}
          </Typography>
        </Box>
        {inputParam.type === "file" && (
          <File
            disabled={disabled}
            fileType={inputParam.fileType || "*"}
            onChange={(newValue) => changeInputParamValue(newValue)}
            value={
              data.inputs[inputParam.name] ??
              inputParam.default ??
              "Choose a file to upload"
            }
          />
        )}
        {["string", "password", "number"].includes(inputParam.type) && (
          <Input
            disabled={disabled}
            inputParam={inputParam}
            onChange={(newValue) => changeInputParamValue(newValue)}
            value={
              data.inputs[inputParam.name] ??
              inputParam.default ??
              ""
            }
          />
        )}
        {inputParam.type === "options" && (
          <Dropdown
            disabled={disabled}
            name={inputParam.name}
            options={inputParam.options}
            onSelect={(newValue) => changeInputParamValue(newValue)}
            value={
              data.inputs[inputParam.name] ??
              inputParam.default ??
              "choose an option"
            }
          />
        )}
      </>
    );
  };

  return (
    <div ref={ref}>
      {renderAnchorAndHandle()}
      {renderInputParam()}
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
