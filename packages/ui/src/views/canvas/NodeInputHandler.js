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

const import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Handle } from 'react-flow-renderer';
import { Position } from 'react-flow-renderer/dist/types';
import { Box, Typography } from '@mui/material';
import CustomWidthTooltip from './CustomWidthTooltip'
import FileInput from './inputs/FileInput'; 
import TextInput from './inputs/TextInput' 
import Dropdown from './inputs/Dropdown'

const NodeInputHandler = ({ inputAnchor, inputParam, data, disabled = false }) => {
  const [position, setPosition] = useState(0);
  const { reactFlowInstance, updateNodeInternals } = useContext(flowContext);
  const functionRef = useCallback(() => updateNodeInternals(data.id), [data.id, updateNodeInternals]);

  useEffect(() => {
    const { offsetTop, clientHeight } = ref.current;
    setPosition(offsetTop + clientHeight / 2);
    functionRef();
  }, [data.id, ref, functionRef]);

  const handleChange = (newValue, name) => {
    const newInputs = { ...data.inputs, [name]: newValue };
    updateNodeInternals(data.id, newInputs);
  };

  const ref = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    if (ref.current) {
      functionRef();
    }
  }, [functionRef, ref]);

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
            {!inputParam.optional && <span style={{ color: 'red' }}>&nbsp;*</span>}
          </Typography>
          {inputParam.type === 'file' && (
            <FileInput
              disabled={disabled}
              fileType={inputParam.fileType || '*'}
              onChange={(newValue) => handleChange(newValue, inputParam.name)}
              value={data.inputs[inputParam.name] ?? inputParam.default ?? 'Choose a file to upload'}
            />
          )}
          {(inputParam.type === 'string' || inputParam.type === 'password' || inputParam.type === 'number') && (
            <TextInput
              disabled={disabled}
              inputParam={inputParam}
              onChange={(newValue) => handleChange(newValue, inputParam.name)}
              value={data.inputs[inputParam.name] ?? inputParam.default ?? ''}
            />
          )}
          {inputParam.type === 'options' && (
            <Dropdown
              disabled={disabled}
              name={inputParam.name}
              options={inputParam.options}
              onSelect={(newValue) => handleChange(newValue, inputParam.name)}
              value={data.inputs[inputParam.name] ?? inputParam.default ?? 'Choose an option'}
            />
          )}
        </Box>
      )}
    </div>
  );
};

NodeInputHandler.propTypes = {
  inputAnchor: PropTypes.object,
  inputParam: PropTypes.object,
  data: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};

export default NodeInputHandler;

NodeInputHandler.propTypes = {
    inputAnchor: PropTypes.object,
    inputParam: PropTypes.object,
    data: PropTypes.object,
    disabled: PropTypes.bool
}

export default NodeInputHandler
