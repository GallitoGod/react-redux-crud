import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const DEFAULT__STATE = [
	{
		id: "1",
		name: "Gallito God",
		email: "gallopabloj@gmail.com",
		github: "GallitoGod",
	},
	{
		id: "2",
		name: "TotoCapuGod",
		email: "toto@gmail.com",
		github: "lautarobsk",
	},
	{
		id: "3",
		name: "Haakon Dahlberg",
		email: "haakon@gamil.com",
		github: "haakon",
	},
];
export type UserId = string;
export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: UserId;
}

const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	if (persistedState) return JSON.parse(persistedState).users;
	return DEFAULT__STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			state.push({ id, ...action.payload });
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UserId>) => {
			const isUserAlreadyDefined = state.some(
				(user) => user.id === action.payload.id,
			);
			if (!isUserAlreadyDefined) {
				state.push(action.payload);
			}
		},
	},
});

export default usersSlice.reducer;
export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
