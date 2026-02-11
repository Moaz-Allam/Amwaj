import { useRef, useEffect, useState, useMemo, useId } from 'react';
import './CurvedLoop.css';

interface CurvedLoopProps {
    marqueeText?: string;
    speed?: number;
    className?: string;
    curveAmount?: number;
    direction?: 'left' | 'right';
    interactive?: boolean;

    // ✅ NEW (optional): control size directly
    heightPx?: number;   // SVG height (48)
    fontSizePx?: number; // text size (48)
}

const CurvedLoop: React.FC<CurvedLoopProps> = ({
    marqueeText = '',
    speed = 2,
    className = '',
    curveAmount = 12,          // ✅ smaller curve for tiny height
    direction = 'left',
    interactive = true,
    heightPx = 48,             // ✅ default 48px
    fontSizePx = 48            // ✅ default 48px
}) => {
    const text = useMemo(() => {
        const hasTrailing = /\s|\u00A0$/.test(marqueeText);
        return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
    }, [marqueeText]);

    const measureRef = useRef<SVGTextElement>(null);
    const textPathRef = useRef<SVGTextPathElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    const [spacing, setSpacing] = useState(0);
    const [offset, setOffset] = useState(0);

    const uid = useId();
    const pathId = `curve-${uid.replace(/:/g, '')}`;

    // ✅ Make a tiny viewBox that matches 48px height
    // We'll use y=24 as a baseline-ish center line
    const vbW = 1000;
    const vbH = 48;
    const y = 24;

    // ✅ gentler curve inside 48px height
    // curveAmount should be small (like 6–16)
    const pathD = `M-100,${y} Q500,${y + curveAmount} 1540,${y}`;

    const dragRef = useRef(false);
    const lastXRef = useRef(0);
    const dirRef = useRef<'left' | 'right'>(direction);
    const velRef = useRef(0);
    const reqIdRef = useRef<number | null>(null);

    const totalText = spacing
        ? Array(Math.ceil(2000 / spacing) + 2).fill(text).join('')
        : text;

    const ready = spacing > 0;

    useEffect(() => {
        if (measureRef.current) {
            try {
                setSpacing(measureRef.current.getComputedTextLength());
            } catch { }
        }
    }, [text, className, fontSizePx]);

    useEffect(() => {
        if (!spacing || !textPathRef.current) return;
        setOffset(-spacing);
    }, [spacing]);

    useEffect(() => {
        if (!spacing || !ready) return;

        const step = () => {
            if (!dragRef.current && textPathRef.current) {
                const delta = dirRef.current === 'right' ? speed : -speed;

                let current = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
                if (isNaN(current)) current = 0;

                let newOffset = current + delta;
                const wrapPoint = spacing;

                if (newOffset <= -wrapPoint) newOffset += wrapPoint;
                if (newOffset > 0) newOffset -= wrapPoint;

                textPathRef.current.setAttribute('startOffset', newOffset + 'px');
            }
            reqIdRef.current = requestAnimationFrame(step);
        };

        reqIdRef.current = requestAnimationFrame(step);
        return () => {
            if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
        };
    }, [spacing, speed, ready]);

    const onPointerDown = (e: React.PointerEvent) => {
        if (!interactive) return;
        dragRef.current = true;
        lastXRef.current = e.clientX;
        velRef.current = 0;
        (e.target as Element).setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!interactive || !dragRef.current || !textPathRef.current) return;
        const dx = e.clientX - lastXRef.current;
        lastXRef.current = e.clientX;
        velRef.current = dx;

        let current = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = current + dx;

        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;

        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
    };

    const endDrag = () => {
        if (!interactive) return;
        dragRef.current = false;
        if (velRef.current !== 0) {
            dirRef.current = velRef.current > 0 ? 'right' : 'left';
        }
    };

    const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

    return (
        <div
            className="curved-loop-jacket"
            style={{
                visibility: ready ? 'visible' : 'hidden',
                cursor: cursorStyle,
                minHeight: 'auto',
                padding: 0, // ✅ remove big padding
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
        >
            <svg
                className="curved-loop-svg"
                viewBox={`0 0 ${vbW} ${vbH}`}
                preserveAspectRatio="none"
                style={{ height: `${heightPx}px` }} // ✅ force 48px tall
            >
                <text
                    ref={measureRef}
                    xmlSpace="preserve"
                    style={{
                        visibility: 'hidden',
                        opacity: 0,
                        pointerEvents: 'none',
                        fontSize: `${fontSizePx}px`, // ✅ match measurement to final text
                        fontWeight: 700,
                    }}
                    className={className}
                >
                    {text}
                </text>

                <defs>
                    <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
                </defs>

                {ready && (
                    <text
                        className={`curved-text ${className}`}
                        style={{ fill: 'currentColor', fontSize: `${fontSizePx}px` }} // ✅ 48px text
                    >
                        <textPath
                            ref={textPathRef}
                            href={`#${pathId}`}
                            startOffset={offset + 'px'}
                            xmlSpace="preserve"
                            method="align"
                            spacing="auto"
                        >
                            {totalText}
                        </textPath>
                    </text>
                )}
            </svg>
        </div>
    );
};

export default CurvedLoop;
