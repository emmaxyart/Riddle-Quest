export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-sm">
      <div className="backdrop-blur-md bg-foreground/10 rounded-xl sm:rounded-2xl border border-foreground/20 p-6 sm:p-8 shadow-2xl flex flex-col items-center gap-6">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
        <p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Loading Riddles...
        </p>
      </div>
    </div>
  );
}

