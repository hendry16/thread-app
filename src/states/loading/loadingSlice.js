const SHOW_LOADING = 'loading/show';
const HIDE_LOADING = 'loading/hide';

export const showLoading = () => ({ type: SHOW_LOADING });
export const hideLoading = () => ({ type: HIDE_LOADING });

export const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return true;
    case HIDE_LOADING:
      return false;
    default:
      return state;
  }
};
