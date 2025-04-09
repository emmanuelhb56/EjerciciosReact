import { useState, useEffect } from "react";
import { FaCat, FaMouse, FaMeh } from "react-icons/fa"; // Añadimos FaMeh para el empate

export default function App() {
    const [gameState, setGameState] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);
    const [isCatTurn, setIsCatTurn] = useState(true);
    const [catWins, setCatWins] = useState(
        JSON.parse(localStorage.getItem("catWins")) || 0
    );
    const [mouseWins, setMouseWins] = useState(
        JSON.parse(localStorage.getItem("mouseWins")) || 0
    );
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(""); // 'win', 'draw'

    useEffect(() => {
        localStorage.setItem("catWins", JSON.stringify(catWins));
        localStorage.setItem("mouseWins", JSON.stringify(mouseWins));
    }, [catWins, mouseWins]);

    const handleCellClick = (rowIndex, cellIndex) => {
        if (gameState[rowIndex][cellIndex] !== "") return;

        const newGameState = gameState.map((row, index) =>
            index === rowIndex
                ? row.map((cell, index2) => (index2 === cellIndex ? (isCatTurn ? "X" : "O") : cell))
                : row
        );

        setGameState(newGameState);

        const winner = checkWinner(newGameState);
        if (winner) {
            if (winner === "X") {
                setCatWins(catWins + 1);
                setAlertMessage("Ganó el gato");
                setAlertType("win");
            } else {
                setMouseWins(mouseWins + 1);
                setAlertMessage("Ganó el ratón");
                setAlertType("win");
            }
            resetGame();
        } else if (checkDraw(newGameState)) {
            setAlertMessage("Empate");
            setAlertType("draw");
            resetGame();
        } else {
            setIsCatTurn(!isCatTurn);
        }
    };

    const checkWinner = (gameState) => {
        // Comprobamos las filas
        for (let i = 0; i < 3; i++) {
            if (gameState[i][0] !== "" && gameState[i][0] === gameState[i][1] && gameState[i][1] === gameState[i][2]) {
                return gameState[i][0];
            }
        }

        // Comprobamos las columnas
        for (let i = 0; i < 3; i++) {
            if (gameState[0][i] !== "" && gameState[0][i] === gameState[1][i] && gameState[1][i] === gameState[2][i]) {
                return gameState[0][i];
            }
        }

        // Comprobamos las diagonales
        if (gameState[0][0] !== "" && gameState[0][0] === gameState[1][1] && gameState[1][1] === gameState[2][2]) {
            return gameState[0][0];
        }
        if (gameState[0][2] !== "" && gameState[0][2] === gameState[1][1] && gameState[1][1] === gameState[2][0]) {
            return gameState[0][2];
        }

        return null;
    };

    const checkDraw = (gameState) => {
        return gameState.every(row => row.every(cell => cell !== ""));
    };

    const resetGame = () => {
        setGameState([["", "", ""], ["", "", ""], ["", "", ""]]);
        setIsCatTurn(true); // El gato empieza después de cada victoria
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="mb-4 text-3xl font-bold text-gray-800">
                <p>{isCatTurn ? "Es el turno del Gato" : "Es el turno del Ratón"}</p>
            </div>

            {/* Alertas */}
            {alertMessage && (
                <div
                    className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${
                        alertType === "win" ? "bg-green-100 border-green-400 text-green-700" : "bg-yellow-100 border-yellow-400 text-yellow-700"
                    } border px-4 py-3 rounded shadow-md`}
                    role="alert"
                >
                    <div className="flex items-center">
                        <div className="mr-2">
                            {alertType === "win" ? (
                                isCatTurn ? (
                                    <FaCat className="w-6 h-6 text-green-700" />
                                ) : (
                                    <FaMouse className="w-6 h-6 text-green-700" />
                                )
                            ) : (
                                <FaMeh className="w-6 h-6 text-yellow-700" />
                            )}
                        </div>
                        <div className="ml-2 text-lg font-semibold">{alertMessage}</div>
                    </div>
                </div>
            )}

            {/* Tablero 3x3 */}
            <div className="grid grid-cols-3 gap-2">
                {gameState.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-col">
                        {row.map((cell, cellIndex) => (
                            <div
                                key={cellIndex}
                                className={`flex items-center justify-center w-24 h-24 bg-white border-2 border-gray-400 rounded-lg cursor-pointer transition-transform transform ${
                                    cell ? "bg-gray-300" : "hover:scale-105"
                                }`}
                                onClick={() => handleCellClick(rowIndex, cellIndex)}
                            >
                                {cell === "X" ? (
                                    <FaCat className="text-4xl text-gray-800" />
                                ) : cell === "O" ? (
                                    <FaMouse className="text-4xl text-gray-800" />
                                ) : null}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="mt-6 text-center">
                <p className="text-3xl font-semibold text-gray-700">Gatos: {catWins}</p>
                <p className="text-3xl font-semibold text-gray-700">Ratones: {mouseWins}</p>
            </div>
        </div>
    );
}
