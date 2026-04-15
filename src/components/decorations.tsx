"use client"

// 大型彩色圆环装饰
export function ColorRing({ 
  size = 200, 
  color = "#FF6B7A",
  strokeWidth = 8,
  className = ""
}: {
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
}) {
  return (
    <div className={`absolute pointer-events-none animate-spin-slow ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size/2}
          cy={size/2}
          r={size/2 - strokeWidth}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray="20 10"
          opacity={0.5}
        />
      </svg>
    </div>
  )
}

// 弹跳动画的彩色方块
export function BouncingBlock({
  size = 60,
  color = "#FFC224",
  delay = 0,
  className = ""
}: {
  size?: number
  color?: string
  delay?: number
  className?: string
}) {
  return (
    <div 
      className={`absolute pointer-events-none animate-bounce-slow ${className}`}
      style={{ 
        width: size, 
        height: size, 
        backgroundColor: color,
        borderRadius: 12,
        border: '3px solid black',
        boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
        animationDelay: `${delay}s`
      }}
    />
  )
}

// 脉冲动画圆点
export function PulsingDot({
  size = 16,
  color = "#10B981",
  className = ""
}: {
  size?: number
  color?: string
  className?: string
}) {
  return (
    <div 
      className={`absolute rounded-full animate-pulse-scale ${className}`}
      style={{ width: size, height: size, backgroundColor: color }}
    />
  )
}

// 旋转星星
export function SpinningStar({
  size = 40,
  color = "#FFC224",
  className = ""
}: {
  size?: number
  color?: string
  className?: string
}) {
  return (
    <div className={`absolute pointer-events-none animate-spin-slow ${className}`}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2L14.09 8.26L20.18 9.27L15.54 13.14L16.82 19.23L12 16.27L7.18 19.23L8.46 13.14L3.82 9.27L9.91 8.26L12 2Z" />
      </svg>
    </div>
  )
}

// 浮动的引号装饰
export function FloatingQuote({
  size = 80,
  color = "#FF6B7A",
  className = ""
}: {
  size?: number
  color?: string
  className?: string
}) {
  return (
    <div className={`absolute pointer-events-none animate-float ${className}`}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} opacity={0.4}>
        <path d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z" />
      </svg>
    </div>
  )
}

// 动态网格背景
export function AnimatedGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  )
}

// 悬浮卡片效果的装饰块
export function FloatingCard({
  width = 120,
  height = 80,
  color = "#2F81F7",
  className = ""
}: {
  width?: number
  height?: number
  color?: string
  className?: string
}) {
  return (
    <div 
      className={`absolute pointer-events-none animate-float ${className}`}
      style={{
        width,
        height,
        backgroundColor: color,
        borderRadius: 16,
        border: '3px solid black',
        boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)',
        opacity: 0.2
      }}
    />
  )
}

// 波浪线装饰
export function WavyLine({
  width = 200,
  color = "#FF6B7A",
  strokeWidth = 4,
  className = ""
}: {
  width?: number
  color?: string
  strokeWidth?: number
  className?: string
}) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg width={width} height="30" viewBox={`0 0 ${width} 30`} fill="none">
        <path
          d={`M0 15 Q ${width/8} 0, ${width/4} 15 T ${width/2} 15 T ${width*3/4} 15 T ${width} 15`}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={0.6}
        />
      </svg>
    </div>
  )
}

// 装饰性小圆点群
export function DotCluster({ colors, className = "" }: { colors: string[], className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="20" cy="30" r="8" fill={colors[0]} className="animate-pulse-scale" style={{ animationDelay: '0s' }} />
        <circle cx="55" cy="15" r="6" fill={colors[1]} className="animate-pulse-scale" style={{ animationDelay: '0.3s' }} />
        <circle cx="95" cy="35" r="10" fill={colors[2]} className="animate-pulse-scale" style={{ animationDelay: '0.6s' }} />
        <circle cx="35" cy="65" r="7" fill={colors[1]} className="animate-pulse-scale" style={{ animationDelay: '0.2s' }} />
        <circle cx="80" cy="70" r="9" fill={colors[0]} className="animate-pulse-scale" style={{ animationDelay: '0.5s' }} />
        <circle cx="25" cy="100" r="6" fill={colors[2]} className="animate-pulse-scale" style={{ animationDelay: '0.4s' }} />
        <circle cx="70" cy="95" r="8" fill={colors[0]} className="animate-pulse-scale" style={{ animationDelay: '0.1s' }} />
        <circle cx="105" cy="85" r="5" fill={colors[1]} className="animate-pulse-scale" style={{ animationDelay: '0.7s' }} />
      </svg>
    </div>
  )
}

// 页面装饰组合 - 首页
export function HomeDecorations() {
  return (
    <>
      <AnimatedGridBackground />
      <ColorRing size={200} color="#2F81F7" className="top-32 -left-24 opacity-50" />
      <ColorRing size={140} color="#FF6B7A" className="bottom-24 -right-16 opacity-40" />
      <BouncingBlock size={55} color="#FFC224" className="top-40 right-1/4" delay={0} />
      <BouncingBlock size={40} color="#10B981" className="bottom-48 left-48" delay={0.5} />
      <BouncingBlock size={35} color="#FF6B7A" className="top-2/3 right-16" delay={1} />
      <SpinningStar size={45} color="#FF6B7A" className="top-1/3 right-24" />
      <SpinningStar size={30} color="#2F81F7" className="bottom-1/3 left-40" />
      <SpinningStar size={25} color="#FFC224" className="top-1/2 left-20" />
      <DotCluster colors={["#2F81F7", "#FFC224", "#FF6B7A"]} className="top-1/4 left-16 opacity-60" />
      <DotCluster colors={["#10B981", "#FF6B7A", "#2F81F7"]} className="bottom-1/4 right-24 opacity-50" />
      <FloatingCard width={110} height={75} color="#2F81F7" className="top-1/3 -left-6" />
      <FloatingCard width={90} height={65} color="#FFC224" className="bottom-1/3 -right-4" />
      <WavyLine width={180} color="#FF6B7A" className="top-24 right-1/3 rotate-6" />
      <WavyLine width={150} color="#10B981" className="bottom-32 left-1/3 -rotate-3" />
      <FloatingQuote size={100} color="#FFC224" className="bottom-40 left-1/4" />
    </>
  )
}

// 页面装饰组合 - 博客
export function BlogDecorations() {
  return (
    <>
      <AnimatedGridBackground />
      <ColorRing size={180} color="#FF6B7A" className="-top-16 -right-24 opacity-50" />
      <ColorRing size={120} color="#FFC224" className="bottom-40 -left-12 opacity-40" />
      <BouncingBlock size={50} color="#FF6B7A" className="top-32 left-24" delay={0.2} />
      <BouncingBlock size={38} color="#FFC224" className="bottom-40 right-1/4" delay={0.7} />
      <SpinningStar size={50} color="#FFC224" className="top-1/4 right-20" />
      <SpinningStar size={35} color="#FF6B7A" className="bottom-1/3 left-24" />
      <FloatingQuote size={120} color="#FF6B7A" className="top-24 right-1/3" />
      <FloatingQuote size={80} color="#FFC224" className="bottom-1/3 left-40" />
      <DotCluster colors={["#FF6B7A", "#FFC224", "#2F81F7"]} className="top-1/2 left-12 opacity-60" />
      <WavyLine width={200} color="#FF6B7A" className="top-20 left-1/4 -rotate-6" strokeWidth={5} />
      <FloatingCard width={100} height={70} color="#FF6B7A" className="top-1/2 -right-8" />
    </>
  )
}

// 页面装饰组合 - 收藏
export function BookmarksDecorations() {
  return (
    <>
      <AnimatedGridBackground />
      <ColorRing size={170} color="#2F81F7" className="top-24 -left-20 opacity-50" />
      <ColorRing size={130} color="#10B981" className="-bottom-12 right-16 opacity-40" />
      <BouncingBlock size={48} color="#2F81F7" className="top-28 right-32" delay={0.3} />
      <BouncingBlock size={60} color="#FFC224" className="bottom-32 left-20" delay={0.8} />
      <BouncingBlock size={35} color="#10B981" className="top-1/2 right-16" delay={0.5} />
      <SpinningStar size={40} color="#2F81F7" className="top-1/3 right-28" />
      <SpinningStar size={28} color="#10B981" className="bottom-1/4 left-32" />
      <DotCluster colors={["#2F81F7", "#10B981", "#FFC224"]} className="bottom-1/3 right-20 opacity-60" />
      <FloatingCard width={95} height={68} color="#2F81F7" className="top-1/4 -right-4" />
      <FloatingCard width={80} height={55} color="#10B981" className="bottom-1/4 -left-6" />
      <WavyLine width={180} color="#2F81F7" className="bottom-24 right-1/3 rotate-3" strokeWidth={5} />
    </>
  )
}

// 页面装饰组合 - 想法
export function ThoughtsDecorations() {
  return (
    <>
      <AnimatedGridBackground />
      <ColorRing size={160} color="#FFC224" className="-top-16 right-1/4 opacity-60" />
      <ColorRing size={110} color="#FF6B7A" className="bottom-32 -left-12 opacity-40" />
      <BouncingBlock size={55} color="#FFC224" className="top-1/4 left-20" delay={0.1} />
      <BouncingBlock size={42} color="#FF6B7A" className="bottom-24 right-24" delay={0.6} />
      <BouncingBlock size={30} color="#2F81F7" className="top-1/2 right-40" delay={0.9} />
      <SpinningStar size={55} color="#FFC224" className="top-28 right-24" />
      <SpinningStar size={38} color="#FF6B7A" className="bottom-1/3 left-1/4" />
      <FloatingQuote size={140} color="#FFC224" className="top-1/3 right-1/4" />
      <FloatingQuote size={90} color="#FF6B7A" className="bottom-1/4 left-1/3" />
      <DotCluster colors={["#FFC224", "#FF6B7A", "#6366F1"]} className="top-1/2 left-16 opacity-60" />
      <FloatingCard width={115} height={80} color="#FFC224" className="bottom-1/3 -left-6" />
      <WavyLine width={220} color="#FFC224" className="top-36 right-20 rotate-6" strokeWidth={5} />
    </>
  )
}

// 页面装饰组合 - 日常
export function DailyDecorations() {
  return (
    <>
      <AnimatedGridBackground />
      <ColorRing size={190} color="#10B981" className="bottom-24 -left-24 opacity-50" />
      <ColorRing size={130} color="#2F81F7" className="top-32 -right-16 opacity-40" />
      <BouncingBlock size={50} color="#10B981" className="top-40 left-1/4" delay={0.4} />
      <BouncingBlock size={45} color="#2F81F7" className="bottom-1/3 right-20" delay={0.9} />
      <BouncingBlock size={32} color="#FFC224" className="top-2/3 left-16" delay={0.2} />
      <SpinningStar size={42} color="#10B981" className="top-1/4 right-1/3" />
      <SpinningStar size={30} color="#FFC224" className="bottom-28 left-24" />
      <SpinningStar size={25} color="#2F81F7" className="top-1/2 right-16" />
      <DotCluster colors={["#10B981", "#2F81F7", "#FFC224"]} className="top-1/3 left-20 opacity-60" />
      <DotCluster colors={["#FFC224", "#10B981", "#FF6B7A"]} className="bottom-1/4 right-32 opacity-50" />
      <FloatingCard width={100} height={72} color="#10B981" className="top-1/2 -right-8" />
      <FloatingCard width={85} height={60} color="#2F81F7" className="bottom-40 -left-4" />
      <WavyLine width={190} color="#10B981" className="bottom-20 right-1/4 -rotate-6" strokeWidth={5} />
      <FloatingQuote size={85} color="#10B981" className="top-1/3 left-40" />
    </>
  )
}
