import React, { useEffect, useRef, useState } from "react";
import "../../css/landing/hero.css";
import { gsap } from "../../animations/gsapSetup";

const HeroSection: React.FC = () => {
  const ROWS = 6;
  const COLS = 6;
  const BLOCK_SIZE = 50;
  const COOLDOWN = 1000;

  const [isFlipped, setIsFlipped] = useState(false);
  const isFlippedRef = useRef(false);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blocksRef = useRef<HTMLDivElement | null>(null);
  const [blockInfo, setBlockInfo] = useState({ numCols: 0, numBlocks: 0 });

  // Tiles hover animatie
  const handleTileMouseEnter = (index: number) => {
    const tile = tileRefs.current[index];
    if (!tile) return;

    const lastEnterTime = parseInt(tile.dataset.lastEnterTime || "0");
    const currentTime = Date.now();
    if (currentTime - lastEnterTime < COOLDOWN) return;
    tile.dataset.lastEnterTime = String(currentTime);

    let tiltY: number;
    switch (index % 6) {
      case 0: tiltY = -40; break;
      case 5: tiltY = 40; break;
      case 1: tiltY = -20; break;
      case 4: tiltY = 20; break;
      case 2: tiltY = -10; break;
      default: tiltY = 10;
    }

    gsap.timeline()
      .set(tile, { rotateX: isFlippedRef.current ? 180 : 0, rotateY: 0 })
      .to(tile, { rotateX: isFlippedRef.current ? 450 : 270, rotateY: tiltY, duration: 0.5, ease: "power2.out" })
      .to(tile, { rotateX: isFlippedRef.current ? 540 : 360, rotateY: 0, duration: 0.5, ease: "power2.out" }, "-=0.25");
  };

  // Flip alle tiles
  const flipAllTiles = () => {
    isFlippedRef.current = !isFlippedRef.current;
    setIsFlipped(isFlippedRef.current); // optioneel, voor UI
    gsap.to(tileRefs.current, {
      rotateX: isFlippedRef.current ? 180 : 0,
      duration: 1,
      stagger: { amount: 0.5, from: "random" },
      ease: "power2.inOut",
    });
  };

  // Blocks highlight
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { numCols } = blockInfo;
    const blocksContainer = blocksRef.current;
    if (!blocksContainer) return;

    const rect = blocksContainer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / BLOCK_SIZE);
    const row = Math.floor(y / BLOCK_SIZE);
    const index = row * numCols + col;

    const block = blocksContainer.children[index] as HTMLDivElement | undefined;
    if (block) {
      block.classList.add("highlight");
      setTimeout(() => block.classList.remove("highlight"), 250);
    }
  };

  // Init block grid
  useEffect(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const numCols = Math.ceil(screenWidth / BLOCK_SIZE);
    const numRows = Math.ceil(screenHeight / BLOCK_SIZE);
    const numBlocks = numCols * numRows;
    setBlockInfo({ numCols, numBlocks });
  }, []);

  return (
    <>
      <nav className="flip-tiles">
        <button onClick={flipAllTiles}>Flip Tiles</button>
      </nav>

      <section className="board">
        {Array.from({ length: ROWS }).map((_, row) => (
          <div className="row" key={row}>
            {Array.from({ length: COLS }).map((_, col) => {
              const index = row * COLS + col;
              return (
                <div
                  className="tile"
                  key={index}
                  ref={(el) => { tileRefs.current[index] = el; }}
                  onMouseEnter={() => handleTileMouseEnter(index)}
                >
                  <div
                    className="tile-face tile-front"
                    style={{ backgroundPosition: `${col * 20}% ${row * 20}%` }}
                  />
                  <div
                    className="tile-face tile-back"
                    style={{ backgroundPosition: `${col * 20}% ${row * 20}%` }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </section>

      <div className="blocks-container" ref={blocksRef} onMouseMove={handleMouseMove}>
        {Array.from({ length: blockInfo.numBlocks }).map((_, i) => (
          <div className="block" key={i} />
        ))}
      </div>
    </>
  );
};

export default HeroSection;
