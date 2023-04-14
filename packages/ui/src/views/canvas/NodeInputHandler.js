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

const const NodeInputForm = ({ inputAnchor, inputParam, data }) => {
  const reactFlow = useContext(flowContext);
  const { id, selected, inputs } = data;
  const [position, setPosition] = useState(0);
  const ref = useRef(null);
  const theme = useTheme();
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    if (ref.current) {
      setPosition(ref.current.offsetTop + ref.current.clientHeight / 2);
      updateNodeInternals(id);
    }
  }, [id, ref, updateNodeInternals]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, position, updateNodeInternals]);

  const onInputChange = (newValue, name) => {
    inputs[name] = newValue;
  };

  const renderInput = () => {
    const { label, optional, name, default: defaultValue, fileType, options, type } = inputParam;

    if(type === 'file') {
      return (
        <File
          disabled={false}
          fileType={fileType || '*'}
          onChange={(newValue) => onInputChange(newValue, name)}
          value={inputs[name] ?? defaultValue ?? 'Choose a file to upload'}
        />
      );
    }

    if(['string', 'password', 'number'].includes(type)) {
      return (
        <Input
          disabled={false}
          inputParam={inputParam}
          onChange={(newValue) => onInputChange(newValue, name)}
          value={inputs[name] ?? defaultValue ?? ''}
        />
      );
    }

    if(type === 'options') {
      return (
        <Dropdown
          disabled={false}
          name={name}
          options={options}
          onSelect={(newValue) => onInputChange(newValue, name)}
          value={inputs[name] ?? defaultValue ?? 'Choose an option'}
        />
      )
    }
    
    return null;
  };

  const renderInputAnchor = () => {
    if(!inputAnchor) return null;

    return (
      <>
        <CustomWidthTooltip placement='left' title={inputAnchor.type}>
          <Handle
            type='target'
            position={Position.Left}
            key={inputAnchor.id}
            id={inputAnchor.id}
            isValidConnection={(connection) => isValidConnection(connection, reactFlow.reactFlowInstance)}
            style={{
              height: 10,
              width: 10,
              backgroundColor: selected ? theme.palette.primary.main : theme.palette.text.secondary,
              top: position
            }}
          />
        </CustomWidthTooltip>
        <Box sx={{ p: 2 }}>
          <Typography>
            {inputAnchor.label}
            {!inputAnchor.optional && <span style={{ color: 'red' }}>&nbsp;*</span>}
          </Typography>
          {renderInput()}
        </Box>
      </>
    );
  };

  return (
    <div ref={ref}>
      {renderInputAnchor()}
    </div>
  )
};

NodeInputHandler.propTypes = {
    inputAnchor: PropTypes.object,
    inputParam: PropTypes.object,
    data: PropTypes.object,
    disabled: PropTypes.bool
}

export default NodeInputHandler
