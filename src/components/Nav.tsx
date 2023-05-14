import { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { TbMountain } from "react-icons/tb";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Sidebar from "./Sidebar";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";

const Nav = () => {
	const { currentUser } = useContext(AuthContext);
	const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const navigate = useNavigate();

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		navigate(`/search?keyword=${searchInput}`);
		setSearchInput("");
		console.log(`Search submitted: ${searchInput}`);
	};

	return (
		<nav className="navbar flex items-center justify-between py-4 px-6 bg-gray-800 z-10 relative">
			<div className="flex items-center">
				<FaBars
					className="h-7 w-7 text-white cursor-pointer"
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				/>

				<div className="ml-5 flex justify-center items-center">
					<Link to="/">
						<TbMountain className="h-7 w-20 text-white items-center cursor-pointer" />
						<span className="text-white font-bold text-sm">Mountaineer</span>
					</Link>
				</div>
			</div>

			<div className="flex items-center justify-center">
				<form onSubmit={handleSearchSubmit}>
					<input
						type="text"
						placeholder="검색"
						className="px-4 py-2 mr-2 border border-gray-300 rounded-lg focus:outline-none"
						value={searchInput}
						onChange={(e) => {
							setSearchInput(e.target.value);
						}}
					/>
				</form>

				<div className="items-center justify-center">
					{currentUser && currentUser.photoURL ? (
						<button
							className="text-white font-semibold focus:outline-none"
							onClick={() => {
								setIsProfileModalOpen(true);
							}}
						>
							<img
								src={currentUser.photoURL}
								alt="Profile Picture"
								className="h-10 w-10 rounded-full mx-1"
							/>
						</button>
					) : (
						<>
							<Link to="/login">
								<button className="text-white font-semibold text-sm focus:outline-none">
									로그인
								</button>
							</Link>
							<span className="text-white font-semibold ml-1 mr-1">|</span>
							<Link to="/join">
								<button className="text-white font-semibold text-sm focus:outline-none">
									회원가입
								</button>
							</Link>
						</>
					)}
				</div>
				<div className="absolute top-20">
					{isProfileModalOpen && (
						<ProfileModal setIsProfileModalOpen={setIsProfileModalOpen} />
					)}
				</div>
				{isSidebarOpen && <Sidebar />}
			</div>
		</nav>
	);
};

export default Nav;
