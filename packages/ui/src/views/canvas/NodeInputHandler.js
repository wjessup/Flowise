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

const const getHandleStyle = (theme, data, position) => ({
  height: 10,
  width: 10,
  backgroundColor: data.selected
    ? theme.palette.primary.main
    : theme.palette.text.secondary,
  top: position,
});

const NodeInputHandler = React.memo(({ inputAnchor, inputParam, data }) => {
  const theme = useTheme();
  const ref = React.useRef(null);
  const { reactFlowInstance } = useFlowContext();

  React.useEffect(() => {
    if (ref.current) {
      const newPos =
        ref.current.offsetTop + ref.current.clientHeight / 2;
      inputAnchor && setPosition(newPos);
    }
  }, [ref, inputAnchor]);

  const handleInputChange = (newValue, name) => {
    const updatedInputs = {
      ...data.inputs,
      [name]: newValue,
    };
    const updatedData = { ...data, inputs: updatedInputs };
    if (data.id) {
      useUpdateNodeInternals(data.id);
    }
    return updatedData;
  };

  let InputComponent;
  switch (inputParam?.type) {
    case "options":
      InputComponent = Dropdown;
      break;
    case "file":
      InputComponent = File;
      break;
    case "string":
    case "password":
    case "number":
    default:
      InputComponent = Input;
  }

  return (
    <div ref={ref}>
      {inputAnchor && (
        <>
          <CustomWidthTooltip placement="left" title={inputAnchor.type}>
            <Handle
              type="target"
              position={Position.Left}
              key={inputAnchor.id}
              id={inputAnchor.id}
              isValidConnection={(connection) =>
                isValidConnection(connection, reactFlowInstance)
              }
              style={getHandleStyle(theme, data, ref.current?.offsetTop)}
            />
          </CustomWidthTooltip>
          <Box sx={{ p: 2 }}>
            <Typography>
              {inputAnchor.label}
              {!inputAnchor.optional && (
                <span style={{ color: "red" }}>&nbsp;*</span>
              )}
            </Typography>
          </Box>
        </>
      )}

      {inputParam && (
        <>
          <Box sx={{ p: 2 }}>
            <Typography>
              {inputParam.label}
              {!inputParam.optional && (
                <span style={{ color: "red" }}>&nbsp;*</span>
              )}
            </Typography>
            <InputComponent
              inputParam={inputParam}
              onChange={(newValue) =>
                handleInputChange(newValue, inputParam.name)
              }
              value={(() => {
                const currentValue = data.inputs[inputParam.name];
                return currentValue ?? inputParam.default || "";
              })()}
              fileType={inputParam.fileType || "*"}
              name={inputParam?.name}
              options={inputParam?.options}
              onSelect={(newValue) =>
                handleInputChange(newValue, inputParam.name)
              }
            />
          </Box>
        </>
      )}
    </div>
  );
});

NodeInputHandler.propTypes = {
    inputAnchor: PropTypes.object,
    inputParam: PropTypes.object,
    data: PropTypes.object,
    disabled: PropTypes.bool
}

export default NodeInputHandler
