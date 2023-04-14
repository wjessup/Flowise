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

const // Import statements

// Sub-component responsible for rendering an input anchor
function InputAnchor({ inputAnchor, theme, data, position, reactFlowInstance }) {
  return (
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
          style={{
            height: 10,
            width: 10,
            backgroundColor: data.selected
              ? theme.palette.primary.main
              : theme.palette.text.secondary,
            top: position,
          }}
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
  );
}

// Sub-component responsible for rendering an input parameter
function InputParam({ inputParam, data, disabled }) {
  const [inputValue, setInputValue] = useState(() => {
    return (
      data.inputs[inputParam.name] ??
      inputParam.default ??
      (inputParam.type === "file" ? "Choose a file to upload" : "")
    );
  });

  useEffect(() => {
    // Update the data object when input value changes
    data.inputs[inputParam.name] = inputValue;
  }, [inputValue, inputParam.name, data.inputs]);

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleDropdownChange(newDropdownValue) {
    setInputValue(newDropdownValue);
  }

  function handleFileChange(newFile) {
    setInputValue(inputParam.default);
    data.inputs[inputParam.name] = newFile;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography>
        {inputParam.label}
        {!inputParam.optional && (
          <span style={{ color: "red" }}>&nbsp;*</span>
        )}
      </Typography>
      {inputParam.type === "file" && (
        <File
          disabled={disabled}
          fileType={inputParam.fileType || "*"}
          onChange={handleFileChange}
          value={inputValue}
        />
      )}
      {(inputParam.type === "string" ||
        inputParam.type === "password" ||
        inputParam.type === "number") && (
        <Input
          disabled={disabled}
          inputParam={inputParam}
          onChange={handleChange}
          value={inputValue}
        />
      )}
      {inputParam.type === "options" && (
        <Dropdown
          disabled={disabled}
          name={inputParam.name}
          options={inputParam.options}
          onSelect={handleDropdownChange}
          value={inputValue}
        />
      )}
    </Box>
  );
}

// Refactored NodeInputHandler component
function NodeInputHandler({
  inputAnchor,
  inputParam,
  data,
  disabled = false,
}) {
  const theme = useTheme();
  const ref = useRef(null);
  const [position, setPosition] = useState(0);
  const { reactFlowInstance } = useContext(flowContext);

  useEffect(() => {
    // Set position when the ref changes
    if (ref.current) {
      setPosition(
        ref.current.offsetTop + ref.current.clientHeight / 2
      );
    }
  }, [ref.current]);

  return (
    <div ref={ref}>
      {inputAnchor && (
        <InputAnchor
          inputAnchor={inputAnchor}
          theme={theme}
          data={data}
          position={position}
          reactFlowInstance={reactFlowInstance}
        />
      )}

      {inputParam && (
        <InputParam
          inputParam={inputParam}
          data={data}
          disabled={disabled}
        />
      )}
    </div>
  );
}

NodeInputHandler.propTypes = {
    inputAnchor: PropTypes.object,
    inputParam: PropTypes.object,
    data: PropTypes.object,
    disabled: PropTypes.bool
}

export default NodeInputHandler
