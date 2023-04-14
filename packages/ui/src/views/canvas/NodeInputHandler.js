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

const import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Typography, useTheme } from '@material-ui/core';
import CustomWidthTooltip from './CustomWidthTooltip';
import Handle from './Handle';
import { Position } from 'react-flow-renderer';
import Dropdown from './Dropdown';
import File from './File';
import Input from './Input';
import { flowContext } from './FlowContext';

function NodeInputHandler({ inputAnchor, inputParam = {}, data, disabled = false }) {
  const theme = useTheme();
  const ref = useRef(null);
  const [position, setPosition] = useState(0);
  const { reactFlowInstance, updateNodeInternals } = useContext(flowContext);

  useEffect(() => {
    if (ref.current) {
      const newPosition = ref.current.offsetTop + ref.current.clientHeight / 2;
      if (newPosition !== position) setPosition(newPosition);
      updateNodeInternals(data.id);
    }
  }, [data.id, position, ref, updateNodeInternals]);

  function handleInputChange(paramName, newValue) {
    data.inputs[paramName] = newValue;
    updateNodeInternals?.(data.id);
  }

  return (
    <div ref={ref}>
      { inputAnchor ?
        (<Box sx={{ display: 'flex' }}>
          <CustomWidthTooltip placement='left' title={inputAnchor.type}>
            <Handle
              type='target'
              position={Position.Left}
              key={inputAnchor.id}
              id={inputAnchor.id}
              isValidConnection={(connection) => connection.target !== data.id}
              style={{
                height: 10,
                width: 10,
                backgroundColor: data.selected ? theme.palette.primary.main : theme.palette.text.secondary,
                top: position,
              }}
            />
          </CustomWidthTooltip>
          <Box sx={{ pl: 2 }}>
            <Typography variant='subtitle1' sx={{ fontWeight: '600' }}>
              {inputAnchor.label}
              {!inputAnchor.optional && <Typography variant='subtitle1' sx={{ color: 'red' }} component='span'> *&nbsp;</Typography>}
            </Typography>
          </Box>
        </Box>
      ): null}
      {inputParam?.type && (
        <Box sx={{ p: 2 }}>
          <Typography variant='subtitle1' sx={{ fontWeight: '600' }}>
            {inputParam.label}
            {!inputParam.optional && <Typography variant='subtitle1' sx={{ color: 'red' }} component='span'> *&nbsp;</Typography>}
          </Typography>
          {inputParam.type === 'file' && (
            <File
              disabled={disabled}
              fileType={inputParam.fileType || '*'}
              onChange={(newValue) => handleInputChange(inputParam.name, newValue)}
              value={data.inputs[inputParam.name] ?? inputParam.default ?? 'Choose a file to upload'}
            />
          )}
          {(inputParam.type === 'string' || inputParam.type === 'password' || inputParam.type === 'number') && (
            <Input
              disabled={disabled}
              inputParam={inputParam}
              onChange={(newValue) => handleInputChange(inputParam.name, newValue)}
              value={data.inputs[inputParam.name] ?? inputParam.default ?? ''}
            />
          )}
          {inputParam.type === 'options' && (
            <Dropdown
              disabled={disabled}
              name={inputParam.name}
              options={inputParam.options}
              onSelect={(newValue) => handleInputChange(inputParam.name, newValue)}
              value={data.inputs[inputParam.name] ?? inputParam.default ?? 'Choose an option'}
            />
          )}
        </Box>
      )}
    </div>
  );
}

export default NodeInputHandler;

NodeInputHandler.propTypes = {
    inputAnchor: PropTypes.object,
    inputParam: PropTypes.object,
    data: PropTypes.object,
    disabled: PropTypes.bool
}

export default NodeInputHandler
