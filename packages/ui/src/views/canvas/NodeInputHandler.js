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

const const updateNodePosition = (data, ref, setPosition, updateNodeInternals) => {
  if (ref.current && ref.current.offsetTop && ref.current.clientHeight) {
    setPosition(ref.current.offsetTop + ref.current.clientHeight / 2);
    updateNodeInternals(data.id);
  }
};

const InputElement = ({ inputParam, data, disabled }) => {
  const { name, type, label, options, default: defaultValue, fileType } = inputParam;

  const inputOnChange = (newValue) => data.inputs[name] = newValue;

  const inputProps = { disabled, inputParam, onChange: inputOnChange };
  
  switch(type) {
    case 'file':
      return (
        <Box sx={{ p: 2 }}>
          <Typography>
            {label}
            {!inputParam.optional && <span style={{ color: 'red' }}>&nbsp;*</span>}
          </Typography>
          <File
            {...inputProps}
            fileType={fileType || '*'}
            value={
              (data.inputs[name]) ? data.inputs[name] : defaultValue ?? "Choose a file to upload"
            }
          />
        </Box>
      )

    case 'options':
      const selectOnSelect = (newValue) => (data.inputs[name] = newValue);

      return (
        <Box sx={{ p: 2 }}>
          <Typography>
            {label}
            {!inputParam.optional && <span style={{ color: 'red' }}>&nbsp;*</span>}
          </Typography>
          <Dropdown
            {...inputProps}
            name={name}
            options={options}
            onSelect={selectOnSelect}
            value={data.inputs[name] ?? defaultValue ?? 'Choose an option'}
          />
        </Box>
      );

    default:
      return (
        <Box sx={{ p: 2 }}>
          <Typography>
            {label}
            {!inputParam.optional && <span style={{ color: 'red' }}>&nbsp;*</span>}
          </Typography>
          <Input
            {...inputProps}
            value={data.inputs[name] ?? defaultValue ?? ""}
          />
        </Box>
      );
  }
};

const InputAnchorElement = ({ inputAnchor, data, theme, position, reactFlowInstance }) => (
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
          top: position,
        }}
      />
    </CustomWidthTooltip>
    <Box sx={{ p: 2 }}>
      <Typography>
        {inputAnchor.label}
      </Typography>
    </Box>
  </>
);

export const NodeInputHandler = ({ inputAnchor, inputParam, data, disabled = false }) => {
  const theme = useTheme();
  const ref = useRef(null);
  const [position, setPosition] = useState(0);
  const { reactFlowInstance } = useContext(flowContext);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => updateNodePosition(data, ref, setPosition, updateNodeInternals), [data, ref, setPosition, updateNodeInternals]);

  return (
    <div ref={ref}>
      {inputAnchor && (
        <InputAnchorElement
          inputAnchor={inputAnchor}
          data={data}
          theme={theme}
          position={position}
          reactFlowInstance={reactFlowInstance}
        />
      )}
      {inputParam && (
        <InputElement
          inputParam={inputParam}
          data={data}
          disabled={disabled}
        />
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
