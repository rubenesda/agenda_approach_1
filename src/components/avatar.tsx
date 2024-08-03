type AvatarPros = {
  handleLogOut: () => void;
}

export default function Avatar({ handleLogOut }: AvatarPros) {
  return (
    <div className="relative group">
      <button className="w-10 h-10 rounded-full bg-slate-300"></button>
      <div className="z-20 rounded-md absolute bg-white w-28 py-2.5 px-6 border group-hover:block hidden">
        <button className="text-sm font-medium" onClick={handleLogOut}>Log out</button>
      </div>
    </div>
  );
}
