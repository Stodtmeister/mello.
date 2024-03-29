import { createNewBoard } from "../../store/boards";
import { getBoards } from "../../store/boards";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import "./CreateBoard.css";
import { colors, getRandomInt } from "../Colors";
import Testing from "../Testing/Testing";

const NewBoard = () => {
	const dispatch = useDispatch();

	const ulRef = useRef();

	const [color, setColor] = useState(colors[getRandomInt(colors.length)]);
	const [name, setName] = useState("");
	const [errors, setErrors] = useState({});
	const [showMenu, setShowMenu] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const boardPayLoad = {
		color,
		name,
	};

	//if show menu is false, the hidden classname will be added.
	const ulClassName = "new__board-dropdown" + (showMenu ? " " : " hidden");

	//updates color on submit to a new random one, catches errors and alerts them.
	//creates a new board and updates the db
	const handleSubmit = async (e) => {
		setErrors({});
		e.preventDefault();

		try {
			await dispatch(createNewBoard(boardPayLoad));
			setShowMenu(false);
		} catch (data) {
			// console.log(data, "DAAAAAAAAAAAAAATTTTAAA")
			setErrors(data);
			alert(data.errors);
		} finally {
			setColor(colors[getRandomInt(colors.length)]);
			setName("");
			dispatch(getBoards());
		}
	};

	useEffect(() => {
		dispatch(getBoards()).then(() => setIsLoading(false));
		if (!showMenu) return;

		// click outside of un-hidden form and it will close

		const closeMenu = async (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [dispatch, showMenu]);
	//////////////////////////////
	if (isLoading)
		return <img src="https://i.imgur.com/mWjbe4Q.gif" alt="...Loading"></img>;
	return (
		<Testing
			ulClassName={ulClassName}
			ulRef={ulRef}
			handleSubmit={handleSubmit}
			name={name}
			setName={setName}
			color={color}
			setColor={setColor}
			errors={errors}
		/>
	);
};

export default NewBoard;
