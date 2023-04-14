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
  
  const { position, updatePosition } = usePosition(ref);

  const { updateNodeInternals, setData } = useNodeData(data);

  const handleInputChange = (newValue, name) => {
    setData({
      ...data,
      inputs: {
        ...data.inputs,
        [name]: newValue
      }
    });
  };

  return (
    <div ref={ref}>
      {inputAnchor && (
        <InputAnchor
          inputAnchor={inputAnchor}
          theme={theme}
          position={position}
          updateNodeInternals={updateNodeInternals}
        >
          <Handle
            type="target"
            position={Position.Left}
            key={inputAnchor.id}
            id={inputAnchor.id}
            isValidConnection={(connection) => isValidConnection(connection, inputAnchor, data)}
            style={{
              height: 10,
              width: 10,
              backgroundColor: data.selected ? theme.palette.primary.main : theme.palette.text.secondary,
              top: position
            }}
          />
        </InputAnchor>
      )}
      
       {inputParam && (
        <InputParam
          inputParam={inputParam}
          disabled={disabled}
          handleInputChange={handleInputChange}
          data={data}
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
