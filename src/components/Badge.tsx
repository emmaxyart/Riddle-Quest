interface BadgeProps {
  icon: string;
  title: string;
  description: string;
  earned: boolean;
}

export function Badge({ icon, title, description, earned }: BadgeProps) {
  return (
    <div
      className={`p-4 rounded-lg border ${
        earned
          ? 'bg-purple-500/20 border-purple-500/30'
          : 'bg-foreground/10 border-foreground/20 opacity-50'
      } transition-all duration-300`}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-foreground/70">{description}</p>
        </div>
        {earned && (
          <div className="ml-auto">
            <div className="text-green-400">✓</div>
          </div>
        )}
      </div>
    </div>
  );
}