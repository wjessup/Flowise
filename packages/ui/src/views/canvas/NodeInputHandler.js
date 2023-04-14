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

const import { useState, useEffect, useRef, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { Handle } from 'react-flow-renderer';
import CustomWidthTooltip from '../../CustomWidthTooltip';
import Input from '../Input';
import Dropdown from '../Dropdown';
import File from '../File';

const NodeInputHandler = ({ inputAnchor, inputParam, data, disabled = false }) => {
  const theme = useTheme();
  const ref = useRef(null);
  const [position, setPosition] = useState(null);
  const { reactFlowInstance } = useContext(flowContext);

  useEffect(() => {
    if (ref.current) {
      setPosition(ref.current.offsetTop + ref.current.clientHeight / 2);
    }
  }, [ref]);

  useEffect(() => {
    if (position !== null) {
      updateNodeInternals(data.id);
    }
  }, [data.id, position]);

  const update = (newData) => {
    data.inputs = { ...data.inputs, [inputParam.name]: newData };
    updateNodeInternals(data.id);
  };
  
  return (
    <div ref={ref}>
      {inputAnchor && (
        <>
          <CustomWidthTooltip placement='left' title={inputAnchor.type}>
            <Handle
              type='target'
              position='left'
              key={inputAnchor.id}
              id={inputAnchor.id}
              isValidConnection={(connection) => isValidConnection(connection, reactFlowInstance)}
              style={{
                height: 10,
                width: 10,
                backgroundColor: data.selected ? theme.palette.primary.main : theme.palette.text.secondary,
                top: position || 0
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
            <File
              disabled={disabled}
              fileType={inputParam.fileType || '*'}
              onChange={update}
              value={data.inputs[inputParam.name] || inputParam.default || 'Choose a file to upload'}
            />
          )}
          {(inputParam.type === 'string' || inputParam.type === 'password' || inputParam.type === 'number') && (
            <Input
              disabled={disabled}
              inputParam={inputParam}
              onChange={update}
              value={data.inputs[inputParam.name] || inputParam.default || ''}
            />
          )}
          {inputParam.type === 'options' && (
            <Dropdown
              disabled={disabled}
              name={inputParam.name}
              options={inputParam.options}
              onSelect={update}
              value={data.inputs[inputParam.name] || inputParam.default || 'Choose an option'}
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
    data: PropTypes.object,
    disabled: PropTypes.bool
}

export default NodeInputHandler
