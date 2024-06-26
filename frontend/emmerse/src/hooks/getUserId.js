const useGetUserId = () => {
  return window.localStorage.getItem("userID");
};

export default useGetUserId;
