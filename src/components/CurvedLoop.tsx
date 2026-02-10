
import { useRef, useEffect, useState, useMemo, useId } from 'react';
import './CurvedLoop.css';

interface CurvedLoopProps {
    marqueeText?: string;
    speed?: number;
    className?: string; // CSS class for text styling
    curveAmount?: number; // How much the path curves
    direction?: 'left' | 'right';
    interactive?: boolean;
}

const CurvedLoop: React.FC<CurvedLoopProps> = ({
    marqueeText = '',
    speed = 2,
    className = '',
    curveAmount = 400,
    direction = 'left',
    interactive = true
}) => {
    const text = useMemo(() => {
        // Add non-breaking space for spacing if needed
        const hasTrailing = /\s|\u00A0$/.test(marqueeText);
        return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
    }, [marqueeText]);

    const measureRef = useRef<SVGTextElement>(null);
    const textPathRef = useRef<SVGTextPathElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const [spacing, setSpacing] = useState(0);
    const [offset, setOffset] = useState(0);
    const uid = useId();
    const pathId = `curve-${uid.replace(/:/g, '')}`; // Ensure valid ID
    // The path logic: centered quad bezier
    // M-100,40 start point (left)
    // Q500,${40 + curveAmount} control point (center, pushed down by curveAmount)
    // 1540,40 end point (right)
    const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

    const dragRef = useRef(false);
    const lastXRef = useRef(0);
    const dirRef = useRef<'left' | 'right'>(direction);
    const velRef = useRef(0);
    const reqIdRef = useRef<number | null>(null);

    // Repeat text enough times to fill the path
    // Assume generic width or calculate based on spacing
    const totalText = spacing
        ? Array(Math.ceil(2000 / spacing) + 2)
            .fill(text)
            .join('')
        : text;

    const ready = spacing > 0;

    useEffect(() => {
        if (measureRef.current) {
            try {
                setSpacing(measureRef.current.getComputedTextLength());
            } catch (e) {
                // Fallback or ignore if not rendered
            }
        }
    }, [text, className]);

    useEffect(() => {
        if (!spacing || !textPathRef.current) return;
        const initial = -spacing; // Start slightly off
        // We can just set state, the animation loop handles the attribute
        setOffset(initial);
    }, [spacing]);

    useEffect(() => {
        if (!spacing || !ready) return;

        const step = () => {
            // If user is dragging, strict follow mouse delta (handled in pointerMove)
            // If not dragging, auto scroll
            if (!dragRef.current && textPathRef.current) {
                const delta = dirRef.current === 'right' ? speed : -speed;

                // We use state 'offset' but for smooth anim we read DOM or keep a ref for current pos?
                // Reading DOM attribute is synchronous and fine here.
                // Actually better to keep a ref for current value to avoid DOM read thrashing if desired, 
                // but getting attribute is standard for these marquess.
                // To be safe/clean let's track formatting.

                let current = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
                if (isNaN(current)) current = 0;

                let newOffset = current + delta;

                // Wrap logic
                // If moving left (-speed): we go negative. If < -spacing, wrap to 0?
                // If moving right (+speed): we go positive. If > 0, wrap to -spacing?
                // The standard loop:
                const wrapPoint = spacing;

                // If direction is left (negative delta)
                if (newOffset <= -wrapPoint) newOffset += wrapPoint;
                // If direction is right (positive delta)
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
        // Capture pointer to track outside div
        (e.target as Element).setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!interactive || !dragRef.current || !textPathRef.current) return;
        const dx = e.clientX - lastXRef.current;
        lastXRef.current = e.clientX;
        velRef.current = dx;

        // Update offset immediately
        let current = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = current + dx;

        // Wrap logic same as auto
        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;

        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
    };

    const endDrag = () => {
        if (!interactive) return;
        dragRef.current = false;
        // Resume auto scroll in direction of throw
        if (velRef.current !== 0) {
            dirRef.current = velRef.current > 0 ? 'right' : 'left';
        }
    };

    const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

    // We render a hidden text to measure width first
    return (
        <div
            className="curved-loop-jacket"
            style={{
                visibility: ready ? 'visible' : 'hidden',
                cursor: cursorStyle,
                // Override the min-height from CSS if we want it to fit in flow
                minHeight: 'auto',
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
        >
            <svg className="curved-loop-svg" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid meet">
                {/* Hidden text for measuring */}
                <text ref={measureRef} xmlSpace="preserve" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }} className={className}>
                    {text}
                </text>

                <defs>
                    <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
                </defs>

                {ready && (
                    <text className={`curved-text ${className}`} style={{ fill: 'currentColor' }}>
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
