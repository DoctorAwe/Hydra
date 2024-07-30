import styled from '@emotion/styled';
import { Close as CloseIcon } from '@mui/icons-material';

export const SliderContainer = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;

  /* 横向滚动条样式 */
  ::-webkit-scrollbar {
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const Slide = styled.div`
  display: inline-block;
  margin-right: 10px;
  position: relative;
  width: 100px; /* 固定宽度 */
  height: 100px; /* 固定高度 */
  box-sizing: border-box;

  &:hover {
    cursor: pointer; /* 鼠标悬浮时的样式 */
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isCompleted }) => (isCompleted ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 4px;
`;

export const Checkmark = styled.div`
  font-size: 24px;
  color: lightgreen;
`;

export const DeleteIcon = styled(CloseIcon)`
  position: absolute;
  size: 3px;
  top: 3px;
  right: 3px;
  color: dodgerblue;
  cursor: pointer;
  z-index: 10;
`;
