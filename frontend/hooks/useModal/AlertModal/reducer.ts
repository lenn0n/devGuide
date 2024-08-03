import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertModalProps, initialAlertModalState } from "@components/Modal/AlertModal";

interface SystemState {
  alertModal?: AlertModalProps
}

const initialState: SystemState = {
  alertModal: initialAlertModalState
}

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setAlertModal: (state, action: PayloadAction<AlertModalProps>) => {
      state.alertModal = { ...state.alertModal, ...action.payload}
    },
  },
});

export const {
  setAlertModal
} = systemSlice.actions

export default systemSlice.reducer;
