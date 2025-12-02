import { useRef, useState, useLayoutEffect } from "react";

const TerminalCard = ({ data }: { data: { title: string; lines: string[] } }) => {
  const [open, setOpen] = useState(false);
  const [animating, setAnimating] = useState(false);

  const [fromPos, setFromPos] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    // Startpositie opslaan
    setFromPos({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });

    setAnimating(true);

    // Na een kleine delay → open state aanzetten (animeert naar center)
    setTimeout(() => {
      setOpen(true);
    }, 10);
  };

  const handleClose = (e: any) => {
    e.stopPropagation();
    setOpen(false);

    // Na animatie → reset alles
    setTimeout(() => {
      setAnimating(false);
      setFromPos(null);
    }, 500);
  };

  const isFloating = animating; // kaart zit los van grid

  return (
    <div
      ref={cardRef}
      className={`
        rounded-xl shadow-xl border border-green-500/20 bg-[#0a0a0a]
        p-6 cursor-pointer relative overflow-hidden
        transition-all duration-500
      `}
      style={
        isFloating
          ? {
              position: "fixed",
              top: open ? "50%" : fromPos?.top,
              left: open ? "50%" : fromPos?.left,
              width: open ? "60vw" : fromPos?.width,
              height: open ? "60vh" : fromPos?.height,
              transform: open ? "translate(-50%, -50%)" : "translate(0,0)",
              zIndex: 9999,
            }
          : {}
      }
      onClick={() => {
        if (!open) handleOpen();
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
        <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
        <p className="ml-4 text-white text-lg">{data.title}</p>
      </div>

      {/* Close button */}
      {open && (
        <button
          className="absolute top-3 right-4 text-xl text-white"
          onClick={handleClose}
        >
          ✕
        </button>
      )}

      {/* Content */}
      <div
        className={`text-green-400 text-sm whitespace-pre-line mt-4 transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        {open &&
          data.lines.map((line, idx) => (
            <p
              key={idx}
              className="typing-line"
              style={{ animationDelay: `${idx * 0.3}s` }}
            >
              $ {line}
            </p>
          ))}
      </div>
    </div>
  );
};

export default TerminalCard;
