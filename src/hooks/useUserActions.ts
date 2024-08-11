import { useDispatch } from "react-redux";
import { UserId, addNewUser, deleteUserById } from "../store/users/slice";

export const useUserActions = () => {
	const dispatch = useDispatch();
	const addUser = ({ name, email, github }) => {
		dispatch(addNewUser({ name, email, github }));
	};
	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};
	return { addUser, removeUser };
};
