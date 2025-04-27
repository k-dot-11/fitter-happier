import { HeartPulse } from "lucide-react";

export function HeartPulseGradientIcon({ size = 60 }) {
    return (
        <>
            <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                    <linearGradient
                        id="heart-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor="#f953c6" />
                        <stop offset="100%" stopColor="#b91d73" />
                    </linearGradient>
                </defs>
            </svg>
            <HeartPulse
                size={size}
                style={{ stroke: "url(#heart-gradient)" }}
            />
        </>
    );
}
