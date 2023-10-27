import React from "react";

const Modal = ({
	showModal,
	handleConfirmEmptyTasks,
	handleCancelEmptyTasks,
}) => {
	return (
		<>
			{showModal && (
				<div className="modal ml-6 bg-gray-800 px-4 rounded-lg">
					<div className="modal-content">
						<p className="font-bold">
							¿Desea borrar todas las tareas?
						</p>
						<button
							onClick={handleConfirmEmptyTasks}
							className=" text-white mr-2 hover:text-red-500 focus:text-red-500 transition duration-300 ease-in-out"
						>
							Borrar
						</button>
						<button
							onClick={handleCancelEmptyTasks}
							className=" text-white hover:text-gray-400 focus:text-gray-400 transition duration-300 ease-in-out"
						>
							Cancelar
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
