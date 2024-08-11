import { type Middleware, configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { rollbackUser } from "./users/slice";

const persistenceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		const { type, payload } = action;
		next(action);
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
		if (type === "users/addNewUser") {
			fetch("https://jsonplaceholder.typicode.com/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			})
				.then((res) => {
					if (res.ok) {
						toast.success(`Usuario ${payload.name} guardado correctamente`);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
const syncWithDataBaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const { type, payload } = action;
		const previousState = store.getState();
		next(action);
		if (type === "users/deleteUserById") {
			const userIdToRemove = payload;
			const userToRemove = previousState.users.find(
				(user) => user.id === userIdToRemove,
			);
			fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
				method: "DELETE",
			})
				.then((res) => {
					if (res.ok) {
						toast.success(`Usuario ${payload} borrado correctamente`);
					}
				})

				.catch((err) => {
					toast.error(`Error al eliminar el usuario ${userIdToRemove}`);
					if (userToRemove) store.dispatch(rollbackUser(userToRemove));
					console.log(err);
				});
		}
	};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			persistenceLocalStorageMiddleware,
			syncWithDataBaseMiddleware,
		),
	//middleware: (getDefaultMiddleware) =>
	//	getDefaultMiddleware().concat(persistenceLocalStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
