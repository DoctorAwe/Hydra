/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

export const ContainerBox = styled.div`
  border: 1px dashed gray;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ImageStyle = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: none; // Hide the image element
`;

export const CanvasStyle = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; // Ensure canvas does not interfere with image interactions
`;

export const UploadBox = styled.div`
  height: 50%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed gray;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding: 20px;
  text-align: center;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #e0e0e0;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const Icon = styled(CloudUploadIcon)`
  font-size: 50px;
  color: gray;
  margin-bottom: 16px;
`;

export const HiddenInput = css`
  display: none;
`;
