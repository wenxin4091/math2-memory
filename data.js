/* 数二十件套 · 卡片数据（公式 + 挖空 + 例题共用）
   freq: 考频 2-5（★越多越常考）  tier: 难度档 1低 2中 3高 */
window.MATH2_DATA = {
  title: "数二十件套",
  subtitle: "考研数学二 · 高频抓分记忆",
  skip: "级数 · 三重积分 · 线面积分 · 空间解析几何 · 方向导数与梯度 · 概率论 · 向量空间",
  modules: [
    {
      id: "limit",
      no: "一",
      name: "极限",
      blurb: "0/0 · 1∞型 · 等价 · 泰勒",
      exam: "必考",
      cards: [
        {
          id: "limit-eq",
          kind: "cloze",
          freq: 5,
          tier: 1,
          title: "常用等价无穷小",
          hint: "x→0 时，一阶量几乎都和 x 本身等价。",
          reveal: [
            { tex: "x\\sim\\sin x\\sim\\tan x\\sim\\arcsin x\\sim\\arctan x", display: true },
            { tex: "\\ln(1+x)\\sim e^{x}-1", display: true },
            { tex: "1-\\cos x\\sim \\tfrac12 x^{2}", display: true },
            { tex: "(1+x)^{\\alpha}-1\\sim \\alpha x", display: true }
          ],
          holes: [
            "\\sin x",
            "\\tan x",
            "\\arcsin x",
            "\\arctan x",
            "\\ln(1+x)",
            "e^{x}-1",
            "\\tfrac12 x^{2}",
            "\\alpha x"
          ],
          mask: [
            "x\\sim {{1}}\\sim {{2}}\\sim {{3}}\\sim {{4}}",
            "{{5}}\\sim {{6}}",
            "1-\\cos x\\sim {{7}}",
            "(1+x)^{\\alpha}-1\\sim {{8}}"
          ],
          warning: "等价无穷小：乘除可替换，加减不能随便替换。"
        },
        {
          id: "limit-imp",
          kind: "cloze",
          freq: 5,
          tier: 1,
          title: "重要极限与 1∞ 型",
          hint: "一个是 sinc，一个是 e；1∞ 型先取对数，写成 e 的指数。",
          reveal: [
            { tex: "\\lim_{x\\to 0}\\frac{\\sin x}{x}=1,\\quad \\lim_{x\\to\\infty}\\Big(1+\\frac1x\\Big)^{x}=e", display: true },
            { tex: "\\lim u^{v}=e^{\\lim v(u-1)}\\quad(u\\to 1,\\ v\\to\\infty)", display: true }
          ],
          holes: ["1", "e", "e^{\\lim v(u-1)}", "1", "\\infty"],
          mask: [
            "\\lim_{x\\to 0}\\dfrac{\\sin x}{x}={{1}}",
            "\\lim_{x\\to\\infty}\\Big(1+\\dfrac1x\\Big)^{x}={{2}}",
            "\\lim u^{v}={{3}}\\quad(u\\to {{4}},\\ v\\to {{5}})"
          ]
        },
        {
          id: "limit-rate",
          kind: "cloze",
          freq: 4,
          tier: 1,
          title: "趋级快慢",
          hint: "比阶、放缩、判敛都靠它：谁大谁小要脱口而出。",
          reveal: [
            { tex: "\\ln n \\ll n^{\\alpha} \\ll a^{n} \\ll n! \\ll n^{n}\\quad(a>1,\\ \\alpha>0)", display: true }
          ],
          holes: ["\\ln n", "n^{\\alpha}", "a^{n}", "n!", "n^{n}"],
          mask: [
            "{{1}}\\ll {{2}}\\ll {{3}}\\ll {{4}}\\ll {{5}}"
          ],
          notes: [
            "x→+∞ 时同样成立：ln x ≪ x^α ≪ a^x。",
            "n 项和求极限时，主要保留最大量级那一项。"
          ]
        },
        {
          id: "limit-ineq",
          kind: "cloze",
          freq: 4,
          tier: 2,
          title: "常用放缩不等式",
          hint: "证明题和比大小的常客，方向别记反。",
          reveal: [
            { tex: "\\sin x < x < \\tan x\\quad(0<x<\\tfrac\\pi2)", display: true },
            { tex: "\\frac{x}{1+x}<\\ln(1+x)<x\\quad(x>0)", display: true },
            { tex: "e^{x}\\ge 1+x\\quad(x\\in\\mathbb{R})", display: true }
          ],
          holes: ["x", "\\tan x", "\\ln(1+x)", "1+x"],
          mask: [
            "\\sin x<{{1}}<{{2}}\\ (0<x<\\tfrac\\pi2)",
            "\\dfrac{x}{1+x}<{{3}}<x\\ (x>0)",
            "e^{x}\\ge {{4}}"
          ],
          notes: [
            "ln(1+x) 夹在中间；e^x 永远在切线 1+x 上方。"
          ]
        },
        {
          id: "limit-monotone",
          kind: "cloze",
          freq: 4,
          tier: 3,
          title: "单调有界与夹逼",
          hint: "递推数列证明题的标配：先证有界，再证单调，最后两边取极限。",
          reveal: [
            { tex: "\\text{单调递增有上界（或递减有下界）}\\Rightarrow\\lim x_n\\text{ 存在}", display: true },
            { tex: "y_n\\le x_n\\le z_n,\\ \\lim y_n=\\lim z_n=A\\Rightarrow\\lim x_n=A", display: true },
            { tex: "\\text{递推式 }x_{n+1}=f(x_n)\\text{：两边取极限得 }L=f(L)", display: true }
          ],
          holes: ["\\text{存在}", "A", "L=f(L)"],
          mask: [
            "\\text{单调有界}\\Rightarrow\\lim x_n\\ {{1}}",
            "y_n\\le x_n\\le z_n,\\ \\lim y_n=\\lim z_n={{2}}\\Rightarrow\\lim x_n={{2}}",
            "\\text{递推 }x_{n+1}=f(x_n)\\Rightarrow {{3}}"
          ],
          notes: [
            "考场顺序：有界性 → 单调性 → 令 n→∞ 解 L。",
            "单调性常用 x_{n+1}−x_n 或 x_{n+1}/x_n 判断。"
          ]
        },
        {
          id: "limit-taylor",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "麦克劳林展开（x→0）",
          hint: "做题时带到需要的阶，余项写成 o(x^n)。",
          reveal: [
            { tex: "\\begin{aligned} e^{x}&=1+x+\\tfrac{x^{2}}{2!}+\\tfrac{x^{3}}{3!}+o(x^{3})\\\\ \\sin x&=x-\\tfrac{x^{3}}{3!}+o(x^{3})\\\\ \\cos x&=1-\\tfrac{x^{2}}{2!}+\\tfrac{x^{4}}{4!}+o(x^{4})\\\\ \\ln(1+x)&=x-\\tfrac{x^{2}}{2}+\\tfrac{x^{3}}{3}+o(x^{3})\\\\ (1+x)^{\\alpha}&=1+\\alpha x+\\tfrac{\\alpha(\\alpha-1)}{2}x^{2}+o(x^{2}) \\end{aligned}", display: true }
          ],
          holes: [
            "1+x",
            "x",
            "1",
            "x",
            "1+\\alpha x",
            "\\tfrac{x^{2}}{2!}",
            "\\tfrac{x^{3}}{3!}",
            "\\tfrac{x^{2}}{2!}",
            "\\tfrac{x^{2}}{2}",
            "\\tfrac{x^{3}}{3!}+o(x^{3})",
            "o(x^{3})",
            "\\tfrac{x^{4}}{4!}+o(x^{4})",
            "\\tfrac{x^{3}}{3}+o(x^{3})",
            "\\tfrac{\\alpha(\\alpha-1)}{2}x^{2}+o(x^{2})"
          ],
          mask: [
            "e^{x}={{1}}+{{6}}+{{10}}",
            "\\sin x={{2}}-{{7}}+{{11}}",
            "\\cos x={{3}}-{{8}}+{{12}}",
            "\\ln(1+x)={{4}}-{{9}}+{{13}}",
            "(1+x)^{\\alpha}={{5}}+{{14}}"
          ]
        },
        {
          id: "limit-lhopital",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "洛必达法则",
          hint: "先确认是 0/0 或 ∞/∞，再对分子分母分别求导。",
          reveal: [
            { tex: "\\text{若 }\\lim f=\\lim g=0\\text{ 或 }\\infty,\\text{ 且 }g'\\neq 0", display: true },
            { tex: "\\text{则 }\\lim\\dfrac{f}{g}=\\lim\\dfrac{f'}{g'}", display: true }
          ],
          holes: ["0", "\\infty", "0", "\\dfrac{f'}{g'}"],
          mask: [
            "\\lim f=\\lim g={{1}}\\text{ 或 }{{2}},\\quad g'\\neq {{3}}",
            "\\text{则 }\\lim\\dfrac{f}{g}=\\lim {{4}}"
          ]
        },
        {
          id: "limit-ex",
          kind: "example",
          freq: 5,
          tier: 2,
          title: "等价无穷小求极限",
          problem: "求 \\displaystyle\\lim_{x\\to 0}\\frac{e^{x^{2}}-1}{1-\\cos 2x}",
          idea: "x→0，分子用 e^u-1∼u，分母用 1-cos u ∼ (1/2)u²。",
          steps: [
            { tex: "e^{x^{2}}-1\\sim x^{2}" },
            { tex: "1-\\cos 2x\\sim \\tfrac12(2x)^{2}=2x^{2}" },
            { tex: "\\lim_{x\\to 0}\\frac{x^{2}}{2x^{2}}=\\dfrac12" }
          ],
          answer: "\\dfrac12"
        }
      ]
    },
    {
      id: "deriv",
      no: "二",
      name: "导数",
      blurb: "参数求导 · 极值 · 拐点 · 渐近线",
      exam: "必考",
      cards: [
        {
          id: "deriv-basic",
          kind: "cloze",
          freq: 5,
          tier: 1,
          title: "定义与基本求导",
          hint: "定义是增量比；复合函数先对内层再链式相乘。",
          reveal: [
            { tex: "f'(x_{0})=\\lim_{\\Delta x\\to 0}\\frac{f(x_{0}+\\Delta x)-f(x_{0})}{\\Delta x}", display: true },
            { tex: "(x^{\\mu})'=\\mu x^{\\mu-1},\\ (\\sin x)'=\\cos x,\\ (\\cos x)'=-\\sin x,\\ (\\ln x)'=\\frac1x,\\ (e^{x})'=e^{x}", display: true },
            { tex: "\\big[f(u(x))\\big]'=f'(u)\\cdot u'(x)", display: true }
          ],
          holes: [
            "\\cos x",
            "e^{x}",
            "\\dfrac1x",
            "-\\sin x",
            "\\mu x^{\\mu-1}",
            "f'(u)\\cdot u'(x)",
            "\\dfrac{f(x_{0}+\\Delta x)-f(x_{0})}{\\Delta x}"
          ],
          mask: [
            "(\\sin x)'={{1}},\\quad (e^{x})'={{2}}",
            "(\\ln x)'={{3}},\\quad (\\cos x)'={{4}}",
            "(x^{\\mu})'={{5}}",
            "\\big[f(u(x))\\big]'={{6}}",
            "f'(x_{0})=\\lim_{\\Delta x\\to 0}{{7}}"
          ]
        },
        {
          id: "deriv-param",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "参数方程求导",
          hint: "一阶是 y'_t / x'_t；二阶是把一阶对 t 求导后再除以 x'_t。",
          reveal: [
            { tex: "\\frac{dy}{dx}=\\frac{y'(t)}{x'(t)},\\quad \\frac{d^{2}y}{dx^{2}}=\\frac{\\dfrac{d}{dt}\\big(y'_t/x'_t\\big)}{x'(t)}", display: true }
          ],
          holes: ["y'(t)", "x'(t)", "\\dfrac{d}{dt}(y'_t/x'_t)", "x'(t)"],
          mask: [
            "\\dfrac{dy}{dx}= {{1}} / {{2}}",
            "\\dfrac{d^{2}y}{dx^{2}}= {{3}} / {{4}}"
          ]
        },
        {
          id: "deriv-ext",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "极值判定",
          hint: "先找驻点 f'=0，再用二阶导数看凹凸。",
          reveal: [
            { tex: "f'(x_{0})=0,\\ f''(x_{0})\\neq 0", display: true }
          ],
          holes: ["0", "0", "\\text{极大}", "\\text{极小}"],
          mask: [
            "f'(x_{0})={{1}},\\quad f''(x_{0})\\neq {{2}}",
            "f''(x_{0})<0\\Rightarrow {{3}},\\quad f''(x_{0})>0\\Rightarrow {{4}}"
          ],
          notes: [
            "f''(x₀)<0 → 极大；f''(x₀)>0 → 极小。",
            "二阶为零时，改看一阶在两侧是否变号。"
          ]
        },
        {
          id: "deriv-inflect",
          kind: "cloze",
          freq: 4,
          tier: 2,
          title: "拐点与渐近线",
          hint: "拐点看 f'' 变号；渐近线分水平、垂直、斜三条。",
          reveal: [
            { tex: "f''\\text{ 在 }x_{0}\\text{ 两侧变号 }\\Rightarrow(x_{0},f(x_{0}))\\text{ 为拐点}", display: true }
          ],
          holes: ["\\text{变号}", "y=A", "x=x_{0}", "y=ax+b"],
          mask: [
            "f''\\text{ 在 }x_{0}\\text{ 两侧 }{{1}}\\Rightarrow\\text{拐点}",
            "\\text{水平：}\\lim_{x\\to\\infty}f=A\\Rightarrow {{2}}",
            "\\text{垂直：}\\lim_{x\\to x_{0}}f=\\infty\\Rightarrow {{3}}",
            "\\text{斜：}a=\\lim f/x,\\ b=\\lim(f-ax)\\Rightarrow {{4}}"
          ],
          notes: [
            "水平：lim_{x→∞} f(x)=A ⇒ y=A",
            "垂直：lim_{x→x₀} f(x)=∞ ⇒ x=x₀",
            "斜：a=lim f(x)/x，b=lim[f(x)-ax] ⇒ y=ax+b"
          ]
        },
        {
          id: "deriv-mvt",
          kind: "cloze",
          freq: 4,
          tier: 3,
          title: "微分中值定理",
          hint: "证明题的核心武器。关键在构造辅助函数，凑出罗尔的条件。",
          reveal: [
            { tex: "\\text{罗尔：}f(a)=f(b)\\Rightarrow\\exists\\xi,\\ f'(\\xi)=0", display: true },
            { tex: "\\text{拉氏：}f(b)-f(a)=f'(\\xi)(b-a)", display: true },
            { tex: "\\text{柯西：}\\frac{f(b)-f(a)}{g(b)-g(a)}=\\frac{f'(\\xi)}{g'(\\xi)}", display: true }
          ],
          holes: ["f'(\\xi)=0", "f'(\\xi)(b-a)", "\\dfrac{f'(\\xi)}{g'(\\xi)}", "e^{\\lambda x}f(x)"],
          mask: [
            "\\text{罗尔：}f(a)=f(b)\\Rightarrow {{1}}",
            "\\text{拉氏：}f(b)-f(a)={{2}}",
            "\\text{柯西：}\\dfrac{f(b)-f(a)}{g(b)-g(a)}={{3}}",
            "\\text{遇 }f'+\\lambda f\\text{ 型，试 }{{4}}"
          ],
          notes: [
            "常用辅助函数：e^{λx}f(x)、xf(x)、f(x)/x、F(x)=∫ₐˣf(t)dt。",
            "泰勒中值定理：余项写成 f⁽ⁿ⁺¹⁾(ξ)/(n+1)! ·(x−x₀)ⁿ⁺¹。"
          ],
          warning: "三个定理都要求闭区间连续、开区间可导，ξ 在开区间 (a,b) 内。"
        },
        {
          id: "deriv-curv",
          kind: "cloze",
          freq: 4,
          tier: 3,
          title: "曲率与曲率半径",
          hint: "数二特色考点。直角坐标和参数式两套都要会。",
          reveal: [
            { tex: "K=\\frac{|y''|}{(1+y'^2)^{3/2}},\\quad R=\\frac1K", display: true },
            { tex: "K=\\frac{|x'y''-y'x''|}{(x'^2+y'^2)^{3/2}}", display: true }
          ],
          holes: [
            "\\dfrac{|y''|}{(1+y'^2)^{3/2}}",
            "\\dfrac1K",
            "\\dfrac{|x'y''-y'x''|}{(x'^2+y'^2)^{3/2}}"
          ],
          mask: [
            "K={{1}},\\quad R={{2}}",
            "K={{3}}"
          ],
          notes: [
            "参数式分子是 x'y''−y'x'' 的绝对值，别写成加号。",
            "分母都是 3/2 次方。"
          ]
        },
        {
          id: "deriv-ex",
          kind: "example",
          freq: 5,
          tier: 2,
          title: "参数方程求 dy/dx",
          problem: "\\begin{cases}x=t-t^{2}\\\\ y=t-t^{3}\\end{cases}\\quad \\text{求 }\\dfrac{dy}{dx}",
          idea: "分别对 t 求导，再做商。不必先消参。",
          steps: [
            { tex: "x'(t)=1-2t,\\quad y'(t)=1-3t^{2}" },
            { tex: "\\dfrac{dy}{dx}=\\dfrac{y'(t)}{x'(t)}=\\dfrac{1-3t^{2}}{1-2t}" }
          ],
          answer: "\\dfrac{1-3t^{2}}{1-2t}"
        },
        {
          id: "deriv-inv",
          kind: "cloze",
          freq: 3,
          tier: 1,
          title: "反函数求导",
          hint: "互为反函数，导数互为倒数。",
          reveal: [
            { tex: "\\frac{dx}{dy}=\\frac{1}{dy/dx},\\quad (f^{-1})'(y)=\\frac{1}{f'(x)}", display: true }
          ],
          holes: ["\\dfrac{1}{dy/dx}", "\\dfrac{1}{f'(x)}"],
          mask: [
            "\\dfrac{dx}{dy}={{1}},\\quad (f^{-1})'(y)={{2}}"
          ],
          notes: [
            "二阶了解即可：(f⁻¹)''(y) = −f''(x)/[f'(x)]³。"
          ]
        },
        {
          id: "deriv-higher",
          kind: "cloze",
          freq: 3,
          tier: 3,
          title: "高阶导数",
          hint: "乘积用莱布尼茨；几个基本函数的 n 阶导直接背。",
          reveal: [
            { tex: "(uv)^{(n)}=\\sum_{k=0}^{n}\\binom{n}{k}u^{(k)}v^{(n-k)}", display: true },
            { tex: "\\sin^{(n)}x=\\sin\\left(x+\\frac{n\\pi}{2}\\right),\\quad \\cos^{(n)}x=\\cos\\left(x+\\frac{n\\pi}{2}\\right)", display: true },
            { tex: "\\left(\\frac1{ax+b}\\right)^{(n)}=\\frac{(-1)^n n!\\,a^n}{(ax+b)^{n+1}},\\quad [\\ln(1+x)]^{(n)}=\\frac{(-1)^{n-1}(n-1)!}{(1+x)^n}", display: true }
          ],
          holes: [
            "\\sum_{k=0}^{n}\\binom{n}{k}u^{(k)}v^{(n-k)}",
            "\\sin\\left(x+\\dfrac{n\\pi}{2}\\right)",
            "\\dfrac{(-1)^n n!\\,a^n}{(ax+b)^{n+1}}",
            "\\dfrac{(-1)^{n-1}(n-1)!}{(1+x)^n}"
          ],
          mask: [
            "(uv)^{(n)}={{1}}",
            "\\sin^{(n)}x={{2}}",
            "\\left(\\dfrac1{ax+b}\\right)^{(n)}={{3}}",
            "[\\ln(1+x)]^{(n)}={{4}}"
          ],
          notes: [
            "e^x 的 n 阶导还是 e^x。",
            "二项式系数 C(n,k) 见中学锦囊。"
          ]
        }
      ]
    },
    {
      id: "integ",
      no: "三",
      name: "一元积分",
      blurb: "变上限 · 分部 · 面积体积",
      exam: "分值大头",
      cards: [
        {
          id: "integ-basic",
          kind: "cloze",
          freq: 5,
          tier: 1,
          title: "基本积分",
          hint: "幂函数 μ≠-1；倒数走对数。",
          reveal: [
            { tex: "\\int x^{\\mu}\\,dx=\\frac{x^{\\mu+1}}{\\mu+1}+C\\ (\\mu\\neq -1),\\quad \\int\\frac1x\\,dx=\\ln|x|+C", display: true },
            { tex: "\\int e^{x}\\,dx=e^{x}+C,\\quad \\int\\sin x\\,dx=-\\cos x+C,\\quad \\int\\cos x\\,dx=\\sin x+C", display: true }
          ],
          holes: [
            "\\dfrac{x^{\\mu+1}}{\\mu+1}+C",
            "\\ln|x|+C",
            "e^{x}+C",
            "-\\cos x+C",
            "\\sin x+C"
          ],
          mask: [
            "\\int x^{\\mu}\\,dx={{1}}\\ (\\mu\\neq -1)",
            "\\int\\dfrac1x\\,dx={{2}}",
            "\\int e^{x}\\,dx={{3}}",
            "\\int\\sin x\\,dx={{4}}",
            "\\int\\cos x\\,dx={{5}}"
          ]
        },
        {
          id: "integ-table",
          kind: "cloze",
          freq: 4,
          tier: 1,
          title: "扩展积分表",
          hint: "基本表之外的第二梯队，三角代换后常落到这几个。",
          reveal: [
            { tex: "\\int\\tan x\\,dx=-\\ln|\\cos x|+C,\\quad \\int\\sec x\\,dx=\\ln|\\sec x+\\tan x|+C", display: true },
            { tex: "\\int\\frac{dx}{x^2+a^2}=\\frac1a\\arctan\\frac xa+C,\\quad \\int\\frac{dx}{x^2-a^2}=\\frac1{2a}\\ln\\left|\\frac{x-a}{x+a}\\right|+C", display: true },
            { tex: "\\int\\frac{dx}{\\sqrt{x^2\\pm a^2}}=\\ln|x+\\sqrt{x^2\\pm a^2}|+C", display: true },
            { tex: "\\int\\sqrt{a^2-x^2}\\,dx=\\frac x2\\sqrt{a^2-x^2}+\\frac{a^2}2\\arcsin\\frac xa+C", display: true }
          ],
          holes: [
            "-\\ln|\\cos x|",
            "\\ln|\\sec x+\\tan x|",
            "\\dfrac1a\\arctan\\dfrac xa",
            "\\dfrac1{2a}\\ln\\left|\\dfrac{x-a}{x+a}\\right|",
            "\\ln|x+\\sqrt{x^2\\pm a^2}|",
            "\\dfrac{a^2}2\\arcsin\\dfrac xa"
          ],
          mask: [
            "\\int\\tan x\\,dx={{1}},\\quad \\int\\sec x\\,dx={{2}}",
            "\\int\\dfrac{dx}{x^2+a^2}={{3}},\\quad \\int\\dfrac{dx}{x^2-a^2}={{4}}",
            "\\int\\dfrac{dx}{\\sqrt{x^2\\pm a^2}}={{5}}",
            "\\int\\sqrt{a^2-x^2}\\,dx=\\dfrac x2\\sqrt{a^2-x^2}+{{6}}"
          ],
          warning: "以上均省略 +C，默写时自己补上。"
        },
        {
          id: "integ-sub",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "换元积分·三角代换",
          hint: "看到根号先想代换：根号里是什么形式，决定用谁。",
          reveal: [
            { tex: "\\sqrt{a^2-x^2}:\\ x=a\\sin t;\\quad \\sqrt{a^2+x^2}:\\ x=a\\tan t;\\quad \\sqrt{x^2-a^2}:\\ x=a\\sec t", display: true },
            { tex: "\\text{凑微分：}\\int f(\\varphi(x))\\,\\varphi'(x)dx=F(\\varphi(x))+C", display: true }
          ],
          holes: ["a\\sin t", "a\\tan t", "a\\sec t", "\\varphi'(x)dx", "F(\\varphi(x))"],
          mask: [
            "\\sqrt{a^2-x^2}:\\ x={{1}}",
            "\\sqrt{a^2+x^2}:\\ x={{2}}",
            "\\sqrt{x^2-a^2}:\\ x={{3}}",
            "\\int f(\\varphi(x))\\,{{4}}={{5}}+C"
          ],
          warning: "定积分换元必换限；不定积分换元最后要回代原变量。"
        },
        {
          id: "integ-parts",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "分部积分",
          hint: "谁容易积谁当 dv；常见口诀：反对幂三指。",
          reveal: [
            { tex: "\\int u\\,dv=uv-\\int v\\,du", display: true }
          ],
          holes: [
            "uv",
            "\\int v\\,du",
            "\\text{反}",
            "\\text{对}",
            "\\text{幂}",
            "\\text{三}",
            "\\text{指}"
          ],
          mask: [
            "\\int u\\,dv={{1}}-{{2}}",
            "\\text{口诀：}{{3}}{{4}}{{5}}{{6}}{{7}}"
          ]
        },
        {
          id: "integ-ftc",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "变上限积分求导",
          hint: "上限函数先代入再乘上限的导数；下限变号。",
          reveal: [
            { tex: "\\frac{d}{dx}\\int_{a}^{\\varphi(x)}f(t)\\,dt=f\\big(\\varphi(x)\\big)\\varphi'(x)", display: true },
            { tex: "\\frac{d}{dx}\\int_{u(x)}^{v(x)}f(t)\\,dt=f(v)v'-f(u)u'", display: true }
          ],
          holes: ["f(\\varphi(x))", "\\varphi'(x)", "f(v)v'", "f(u)u'"],
          mask: [
            "\\dfrac{d}{dx}\\int_{a}^{\\varphi(x)}f(t)\\,dt={{1}}\\cdot {{2}}",
            "\\dfrac{d}{dx}\\int_{u}^{v}f(t)\\,dt={{3}}-{{4}}"
          ],
          warning: "被积函数的自变量是哑元 t，不要对 t 再对 x 求导混在一起。"
        },
        {
          id: "integ-sym",
          kind: "cloze",
          freq: 4,
          tier: 2,
          title: "对称性·周期性·华里士",
          hint: "先看区间再看奇偶，能砍掉一半计算量。",
          reveal: [
            { tex: "\\int_{-a}^{a}f\\,dx=\\begin{cases}0,&f\\text{ 为奇函数}\\\\2\\int_0^af\\,dx,&f\\text{ 为偶函数}\\end{cases}", display: true },
            { tex: "\\int_0^{\\pi/2}f(\\sin x)dx=\\int_0^{\\pi/2}f(\\cos x)dx,\\quad \\int_0^\\pi xf(\\sin x)dx=\\frac\\pi2\\int_0^\\pi f(\\sin x)dx", display: true },
            { tex: "I_n=\\int_0^{\\pi/2}\\sin^nx\\,dx=\\begin{cases}\\dfrac{(n-1)!!}{n!!}\\cdot\\dfrac\\pi2,&n\\text{ 为偶数}\\\\[4pt]\\dfrac{(n-1)!!}{n!!},&n\\text{ 为奇数}\\end{cases}", display: true }
          ],
          holes: [
            "0",
            "2\\int_0^af\\,dx",
            "f(\\cos x)",
            "\\dfrac\\pi2",
            "\\dfrac{(n-1)!!}{n!!}\\cdot\\dfrac\\pi2",
            "\\dfrac{(n-1)!!}{n!!}"
          ],
          mask: [
            "f\\text{ 奇}\\Rightarrow\\int_{-a}^{a}f={{1}},\\quad f\\text{ 偶}\\Rightarrow{{2}}",
            "\\int_0^{\\pi/2}f(\\sin x)dx=\\int_0^{\\pi/2}{{3}}\\,dx",
            "\\int_0^\\pi xf(\\sin x)dx={{4}}\\int_0^\\pi f(\\sin x)dx",
            "I_n:\\ n\\text{ 偶}\\Rightarrow{{5}},\\ n\\text{ 奇}\\Rightarrow{{6}}"
          ],
          notes: [
            "华里士口诀：n 为偶数多乘 π/2，n 为奇数到双阶乘为止。",
            "周期函数：∫ₐ^{a+T} f dx = ∫₀^T f dx。"
          ]
        },
        {
          id: "integ-improper",
          kind: "cloze",
          freq: 4,
          tier: 2,
          title: "反常积分",
          hint: "判敛背 p 积分两把尺子；计算就是取极限的定积分。",
          reveal: [
            { tex: "\\int_1^{+\\infty}\\frac{dx}{x^p}:\\ p>1\\text{ 收敛},\\ p\\le 1\\text{ 发散}", display: true },
            { tex: "\\int_0^1\\frac{dx}{x^p}:\\ p<1\\text{ 收敛},\\ p\\ge 1\\text{ 发散}", display: true },
            { tex: "\\int_a^{+\\infty}f\\,dx=\\lim_{b\\to+\\infty}\\int_a^bf\\,dx", display: true }
          ],
          holes: ["p>1", "p<1", "\\lim_{b\\to+\\infty}"],
          mask: [
            "\\int_1^{+\\infty}\\dfrac{dx}{x^p}\\text{ 收敛}\\iff{{1}}",
            "\\int_0^{1}\\dfrac{dx}{x^p}\\text{ 收敛}\\iff{{2}}",
            "\\int_a^{+\\infty}f\\,dx={{3}}\\int_a^bf\\,dx"
          ],
          warning: "无穷区间与瑕点方向相反：远处要 p>1，瑕点处要 p<1。"
        },
        {
          id: "integ-geo",
          kind: "cloze",
          freq: 4,
          tier: 2,
          title: "定积分几何应用",
          hint: "面积取绝对值；绕 x 轴用圆盘，绕 y 轴常用壳层。",
          reveal: [
            { tex: "S=\\int_{a}^{b}|y_{1}-y_{2}|\\,dx", display: true },
            { tex: "V_{x}=\\pi\\int_{a}^{b} y^{2}\\,dx,\\quad V_{y}=2\\pi\\int_{a}^{b} x\\cdot y\\,dx", display: true },
            { tex: "s=\\int_{a}^{b}\\sqrt{1+(y')^{2}}\\,dx", display: true }
          ],
          holes: [
            "\\int_{a}^{b}|y_{1}-y_{2}|\\,dx",
            "\\pi\\int_{a}^{b} y^{2}\\,dx",
            "2\\pi\\int_{a}^{b} x y\\,dx",
            "\\int_{a}^{b}\\sqrt{1+(y')^{2}}\\,dx"
          ],
          mask: [
            "S={{1}}",
            "V_{x}={{2}}",
            "V_{y}={{3}}",
            "s={{4}}"
          ]
        },
        {
          id: "integ-ex",
          kind: "example",
          freq: 5,
          tier: 2,
          title: "变上限求导",
          problem: "求 \\displaystyle\\frac{d}{dx}\\int_{0}^{x^{2}}\\sin t\\,dt",
          idea: "套变上限公式：f(上限)×上限的导数。",
          steps: [
            { tex: "\\frac{d}{dx}\\int_{0}^{x^{2}}\\sin t\\,dt=\\sin(x^{2})\\cdot(x^{2})'" },
            { tex: "=\\sin(x^{2})\\cdot 2x=2x\\sin(x^{2})" }
          ],
          answer: "2x\\sin(x^{2})"
        },
        {
          id: "integ-newton",
          kind: "cloze",
          freq: 5,
          tier: 1,
          title: "牛顿-莱布尼茨公式",
          hint: "定积分 = 原函数在上下限之差。",
          reveal: [
            { tex: "\\int_a^b f(x)\\,dx=F(b)-F(a),\\quad F'=f", display: true }
          ],
          holes: ["F(b)-F(a)"],
          mask: [
            "\\int_a^b f(x)\\,dx={{1}}"
          ],
          notes: [
            "F 是 f 的任一原函数——这就是基本积分表要背熟的原因。"
          ]
        },
        {
          id: "integ-phys",
          kind: "cloze",
          freq: 3,
          tier: 3,
          title: "物理应用与形心",
          hint: "微元法：先写一小段（一片）的贡献，再积分。",
          reveal: [
            { tex: "\\text{功：}W=\\int_a^b F(x)\\,dx,\\quad \\text{水压力：}P=\\int \\rho g h\\,dS", display: true },
            { tex: "\\text{形心：}\\bar x=\\frac{\\iint_D x\\,d\\sigma}{\\iint_D d\\sigma},\\quad \\bar y=\\frac{\\iint_D y\\,d\\sigma}{\\iint_D d\\sigma}", display: true },
            { tex: "\\text{旋转曲面侧面积（绕 }x\\text{ 轴）：}S=2\\pi\\int y\\,ds", display: true }
          ],
          holes: ["\\int_a^b F(x)\\,dx", "\\rho g h\\,dS", "\\dfrac{\\iint_D x\\,d\\sigma}{\\iint_D d\\sigma}", "2\\pi\\int y\\,ds"],
          mask: [
            "W={{1}},\\quad P=\\int{{2}}",
            "\\bar x={{3}}",
            "S={{4}}"
          ],
          notes: [
            "侧面积里 ds 是弧长微元 √(1+y′²)dx。",
            "质心把密度 ρ 乘进分子分母；均匀密度就是形心。"
          ]
        },
        {
          id: "integ-mvt",
          kind: "cloze",
          freq: 3,
          tier: 3,
          title: "积分中值定理与柯西不等式",
          hint: "证明题工具：把积分变成某一点的函数值。",
          reveal: [
            { tex: "\\int_a^b f(x)\\,dx=f(\\xi)(b-a),\\quad \\xi\\in[a,b]", display: true },
            { tex: "\\left(\\int_a^b fg\\right)^2\\le\\int_a^b f^2\\cdot\\int_a^b g^2", display: true }
          ],
          holes: ["f(\\xi)(b-a)", "\\le", "\\int_a^b f^2\\cdot\\int_a^b g^2"],
          mask: [
            "\\int_a^b f(x)\\,dx={{1}}",
            "\\left(\\int_a^b fg\\right)^2{{2}}{{3}}"
          ],
          notes: [
            "要求 f 在 [a,b] 上连续。",
            "广义形式：∫f·g dx = f(ξ)∫g dx（g 不变号）。"
          ]
        }
      ]
    },
    {
      id: "multiv",
      no: "四",
      name: "多元微分",
      blurb: "偏导 · 全微分 · 极值",
      exam: "必考",
      cards: [
        {
          id: "mv-partial",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "偏导数与全微分",
          hint: "对谁求导，另一个就当常数。",
          reveal: [
            { tex: "\\frac{\\partial z}{\\partial x}:\\ \\text{把 }y\\text{ 视为常数};\\quad dz=\\frac{\\partial z}{\\partial x}dx+\\frac{\\partial z}{\\partial y}dy", display: true },
            { tex: "\\text{偏导连续}\\Rightarrow\\text{可微}\\Rightarrow\\text{偏导存在、函数连续}", display: true }
          ],
          holes: ["\\text{常数}", "\\dfrac{\\partial z}{\\partial x}dx+\\dfrac{\\partial z}{\\partial y}dy", "\\text{可微}"],
          mask: [
            "\\text{对 }x\\text{ 求偏导，}y\\text{ 当}{{1}}",
            "dz={{2}}",
            "\\text{偏导连续}\\Rightarrow{{3}}\\Rightarrow\\text{偏导存在、函数连续}"
          ]
        },
        {
          id: "mv-chain",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "复合函数链式法则",
          hint: "画树状图：每条路径相乘，所有路径相加。",
          reveal: [
            { tex: "z=f(u,v):\\ \\frac{\\partial z}{\\partial x}=\\frac{\\partial f}{\\partial u}\\frac{\\partial u}{\\partial x}+\\frac{\\partial f}{\\partial v}\\frac{\\partial v}{\\partial x}", display: true },
            { tex: "z=f(u),\\ u=\\varphi(x,y):\\ \\frac{\\partial z}{\\partial x}=f'(u)\\frac{\\partial u}{\\partial x}", display: true }
          ],
          holes: [
            "\\dfrac{\\partial f}{\\partial u}\\dfrac{\\partial u}{\\partial x}",
            "\\dfrac{\\partial f}{\\partial v}\\dfrac{\\partial v}{\\partial x}",
            "f'(u)\\dfrac{\\partial u}{\\partial x}"
          ],
          mask: [
            "\\dfrac{\\partial z}{\\partial x}={{1}}+{{2}}",
            "\\text{一元外层：}\\dfrac{\\partial z}{\\partial x}={{3}}"
          ],
          notes: [
            "f₁′、f₂′ 表示对第 1、2 个中间变量求偏导，结果仍含 u,v。",
            "求二阶偏导时继续链式，注意 f₁′ 仍是复合函数。"
          ]
        },
        {
          id: "mv-implicit",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "隐函数求偏导",
          hint: "公式法最快：负号别丢。",
          reveal: [
            { tex: "F(x,y)=0:\\ \\frac{dy}{dx}=-\\frac{F_x}{F_y}", display: true },
            { tex: "F(x,y,z)=0:\\ \\frac{\\partial z}{\\partial x}=-\\frac{F_x}{F_z},\\ \\frac{\\partial z}{\\partial y}=-\\frac{F_y}{F_z}", display: true }
          ],
          holes: ["-\\dfrac{F_x}{F_y}", "-\\dfrac{F_x}{F_z}", "-\\dfrac{F_y}{F_z}"],
          mask: [
            "F(x,y)=0\\Rightarrow\\dfrac{dy}{dx}={{1}}",
            "\\dfrac{\\partial z}{\\partial x}={{2}},\\quad \\dfrac{\\partial z}{\\partial y}={{3}}"
          ],
          warning: "公式法里 F 对 x,y,z 分别求偏导（z 当独立变量），与直接法别混。"
        },
        {
          id: "mv-ext",
          kind: "cloze",
          freq: 4,
          tier: 2,
          title: "无条件极值 AC−B²",
          hint: "先求驻点，再算二阶判别式。",
          reveal: [
            { tex: "A=f_{xx},\\ B=f_{xy},\\ C=f_{yy}", display: true },
            { tex: "AC-B^2>0:\\ A>0\\text{ 极小},\\ A<0\\text{ 极大};\\quad AC-B^2<0:\\ \\text{非极值};\\quad =0:\\ \\text{失效}", display: true }
          ],
          holes: ["f_{xy}", "AC-B^2", "\\text{极小}", "\\text{极大}", "\\text{非极值}"],
          mask: [
            "B={{1}},\\quad \\Delta={{2}}",
            ">0\\text{ 且 }A>0\\Rightarrow{{3}},\\ A<0\\Rightarrow{{4}}",
            "<0\\Rightarrow{{5}}"
          ],
          notes: [
            "驻点来自 f_x=0、f_y=0 联立。",
            "Δ=0 时改用定义或特殊路径判断。"
          ]
        },
        {
          id: "mv-lagrange",
          kind: "cloze",
          freq: 4,
          tier: 3,
          title: "拉格朗日乘数法",
          hint: "条件极值的标准流程：造函数、求偏导、解方程组。",
          reveal: [
            { tex: "\\text{约束 }\\varphi(x,y)=0:\\ L(x,y,\\lambda)=f(x,y)+\\lambda\\varphi(x,y)", display: true },
            { tex: "L_x=0,\\ L_y=0,\\ L_\\lambda=0\\Rightarrow\\text{候选点}", display: true }
          ],
          holes: ["f(x,y)+\\lambda\\varphi(x,y)", "L_x=0,\\ L_y=0,\\ L_\\lambda=0"],
          mask: [
            "L(x,y,\\lambda)={{1}}",
            "\\text{解方程组 }{{2}}\\Rightarrow\\text{候选点}"
          ],
          notes: [
            "闭区域最值：内部驻点 + 边界拉格朗日（或代入边界化一元），全部候选点比大小。"
          ]
        },
        {
          id: "mv-ex",
          kind: "example",
          freq: 5,
          tier: 2,
          title: "链式法则求偏导",
          problem: "\\text{设 }z=f(x+y,\\ xy)，\\text{求 }\\dfrac{\\partial z}{\\partial x}",
          idea: "两个中间变量 u=x+y、v=xy，两条路径相加。",
          steps: [
            { tex: "\\frac{\\partial z}{\\partial x}=f_1'\\cdot\\frac{\\partial(x+y)}{\\partial x}+f_2'\\cdot\\frac{\\partial(xy)}{\\partial x}" },
            { tex: "=f_1'\\cdot 1+f_2'\\cdot y" }
          ],
          answer: "f_1'+yf_2'"
        }
      ]
    },
    {
      id: "dint",
      no: "五",
      name: "二重积分",
      blurb: "极坐标 · 对称性",
      exam: "高数最后大题",
      cards: [
        {
          id: "dint-rect",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "直角坐标累次积分",
          hint: "先对 y 后对 x（或反过来），内层限是函数。",
          reveal: [
            { tex: "\\iint_{D}f(x,y)\\,dxdy=\\int_{x_{1}}^{x_{2}}\\left[\\int_{y_{1}(x)}^{y_{2}(x)}f(x,y)\\,dy\\right]dx", display: true }
          ],
          holes: ["x_{1}", "x_{2}", "y_{1}(x)", "y_{2}(x)"],
          mask: [
            "\\text{外层 }x:\\ {{1}}\\to {{2}}",
            "\\text{内层 }y:\\ {{3}}\\to {{4}}"
          ]
        },
        {
          id: "dint-polar",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "极坐标",
          hint: "圆域优先。别忘了多乘一个 r。",
          reveal: [
            { tex: "x=r\\cos\\theta,\\ y=r\\sin\\theta,\\ dxdy=r\\,dr\\,d\\theta", display: true },
            { tex: "\\iint_{D}f=\\int_{\\theta_{1}}^{\\theta_{2}}\\int_{r_{1}(\\theta)}^{r_{2}(\\theta)}f(r\\cos\\theta,r\\sin\\theta)\\,r\\,dr\\,d\\theta", display: true }
          ],
          holes: ["r\\cos\\theta", "r\\sin\\theta", "r\\,dr\\,d\\theta", "r"],
          mask: [
            "x={{1}},\\quad y={{2}}",
            "dxdy={{3}}",
            "\\text{被积函数还要再乘 }{{4}}"
          ],
          warning: "换成极坐标时，被积函数里的 dxdy 必须换成 r dr dθ。"
        },
        {
          id: "dint-sym",
          kind: "cloze",
          freq: 4,
          tier: 2,
          title: "对称性",
          hint: "区域对称时，先看被积函数的奇偶。",
          reveal: [
            { tex: "D\\text{ 关于 }y\\text{ 轴对称：}\\ f(-x,y)=-f(x,y)\\Rightarrow I=0", display: true }
          ],
          holes: ["\\text{奇}", "I=0", "\\text{偶}", "2\\iint_{D_{\\text{右}}}f"],
          mask: [
            "D\\text{ 关于 }y\\text{ 轴对称，}f\\text{ 为 }{{1}}\\Rightarrow {{2}}",
            "f\\text{ 为 }{{3}}\\Rightarrow {{4}}"
          ],
          notes: [
            "若 f(-x,y)=f(x,y)（偶），则 I=2∬_{右半} f。"
          ]
        },
        {
          id: "dint-order",
          kind: "cloze",
          freq: 4,
          tier: 2,
          title: "换序与分块",
          hint: "内层积不出就换序；被积函数带绝对值或 max/min 就分块。",
          reveal: [
            { tex: "\\int_a^b dx\\int_{y_1(x)}^{y_2(x)}f\\,dy\\ \\xrightarrow{\\text{重画 }D}\\ \\int_c^d dy\\int_{x_1(y)}^{x_2(y)}f\\,dx", display: true },
            { tex: "D=D_1\\cup D_2:\\ \\iint_Df=\\iint_{D_1}f+\\iint_{D_2}f", display: true }
          ],
          holes: ["\\text{重画 }D", "D_1\\cup D_2", "\\iint_{D_1}f+\\iint_{D_2}f"],
          mask: [
            "\\text{换序第一步：}{{1}}",
            "D={{2}}\\Rightarrow\\iint_Df={{3}}"
          ],
          notes: [
            "常见信号：内层出现 ∫e^{x²}dx、∫(sin x)/x dx 这类积不出的，立刻换序。"
          ]
        },
        {
          id: "dint-ex",
          kind: "example",
          freq: 5,
          tier: 2,
          title: "单位圆上的极坐标",
          problem: "D:x^{2}+y^{2}\\le 1，计算 \\displaystyle\\iint_{D}(x^{2}+y^{2})\\,dxdy",
          idea: "圆域 + x²+y²=r²，直接极坐标，记得乘 r。",
          steps: [
            { tex: "r\\in[0,1],\\ \\theta\\in[0,2\\pi],\\ x^{2}+y^{2}=r^{2}" },
            { tex: "I=\\int_{0}^{2\\pi}\\int_{0}^{1} r^{2}\\cdot r\\,dr\\,d\\theta=\\int_{0}^{2\\pi}d\\theta\\int_{0}^{1}r^{3}\\,dr" },
            { tex: "=2\\pi\\cdot\\frac14=\\frac{\\pi}{2}" }
          ],
          answer: "\\dfrac{\\pi}{2}"
        }
      ]
    },
    {
      id: "ode",
      no: "六",
      name: "微分方程",
      blurb: "一阶线性 · 二阶常系数",
      exam: "大题",
      cards: [
        {
          id: "ode-sep",
          kind: "cloze",
          freq: 4,
          tier: 1,
          title: "可分离变量方程",
          hint: "把 y 归一边、x 归另一边，两边同时积分。",
          reveal: [
            { tex: "\\frac{dy}{dx}=f(x)g(y)\\Rightarrow\\int\\frac{dy}{g(y)}=\\int f(x)\\,dx", display: true }
          ],
          holes: ["\\int\\dfrac{dy}{g(y)}", "\\int f(x)\\,dx"],
          mask: [
            "\\dfrac{dy}{dx}=f(x)g(y)\\Rightarrow{{1}}={{2}}"
          ],
          notes: [
            "齐次型 y′=φ(y/x)：令 u=y/x 可化为可分离。"
          ]
        },
        {
          id: "ode-1st",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "一阶线性非齐次",
          hint: "标准形 y'+P y=Q。积分因子 e^{∫P dx}。",
          reveal: [
            { tex: "y'+P(x)y=Q(x)", display: true },
            { tex: "y=e^{-\\int P\\,dx}\\left(\\int Q(x)\\,e^{\\int P\\,dx}\\,dx+C\\right)", display: true }
          ],
          holes: ["P(x)y", "Q(x)", "e^{-\\int P\\,dx}", "\\int Q e^{\\int P\\,dx}\\,dx+C"],
          mask: [
            "y'+{{1}}={{2}}",
            "y={{3}}\\left({{4}}\\right)"
          ]
        },
        {
          id: "ode-2nd",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "二阶常系数齐次",
          hint: "特征方程 r²+pr+q=0，按根的类型写通解。",
          reveal: [
            { tex: "y''+py'+qy=0,\\quad r^{2}+pr+q=0", display: true }
          ],
          holes: [
            "py'+qy",
            "r^{2}+pr+q",
            "C_{1}e^{r_{1}x}+C_{2}e^{r_{2}x}",
            "(C_{1}+C_{2}x)e^{rx}",
            "e^{\\alpha x}(C_{1}\\cos\\beta x+C_{2}\\sin\\beta x)"
          ],
          mask: [
            "y''+{{1}}=0",
            "{{2}}=0",
            "r_{1}\\neq r_{2}:\\ y={{3}}",
            "\\text{重根：}y={{4}}",
            "\\alpha\\pm i\\beta:\\ y={{5}}"
          ],
          notes: [
            "两不等实根：y=C₁ e^{r₁x}+C₂ e^{r₂x}",
            "重根：y=(C₁+C₂ x) e^{rx}",
            "共轭复根 r=α±iβ：y=e^{αx}(C₁ cos βx+C₂ sin βx)"
          ]
        },
        {
          id: "ode-nh",
          kind: "cloze",
          freq: 4,
          tier: 2,
          title: "二阶非齐次特解",
          hint: "通解=齐次通解+一个特解。f=P_m(x) e^{λx} 时用待定系数。",
          reveal: [
            { tex: "y^{*}=x^{k} Q_{m}(x)e^{\\lambda x}", display: true }
          ],
          holes: ["x^{k}Q_{m}(x)e^{\\lambda x}", "0", "1", "2"],
          mask: [
            "y^{*}={{1}}",
            "\\lambda\\text{ 非根 }k={{2}},\\ \\text{单根 }k={{3}},\\ \\text{重根 }k={{4}}"
          ],
          notes: [
            "λ 不是特征根 → k=0；是单根 → k=1；是重根 → k=2。"
          ]
        },
        {
          id: "ode-ex",
          kind: "example",
          freq: 5,
          tier: 2,
          title: "二阶齐次通解",
          problem: "解 y''-3y'+2y=0",
          idea: "写特征方程，因式分解求根。",
          steps: [
            { tex: "r^{2}-3r+2=0\\Rightarrow(r-1)(r-2)=0" },
            { tex: "r_{1}=1,\\ r_{2}=2" },
            { tex: "y=C_{1}e^{x}+C_{2}e^{2x}" }
          ],
          answer: "y=C_{1}e^{x}+C_{2}e^{2x}"
        },
        {
          id: "ode-reduce",
          kind: "cloze",
          freq: 3,
          tier: 3,
          title: "可降阶方程",
          hint: "缺 y 直接设 p=y′；缺 x 把 p 当成 y 的函数。",
          reveal: [
            { tex: "y''=f(x,y'):\\ \\text{令 }p=y',\\ y''=p'", display: true },
            { tex: "y''=f(y,y'):\\ \\text{令 }p=y',\\ y''=p\\frac{dp}{dy}", display: true }
          ],
          holes: ["p'", "p\\dfrac{dp}{dy}"],
          mask: [
            "y''=f(x,y'):\\ y''={{1}}",
            "y''=f(y,y'):\\ y''={{2}}"
          ],
          notes: [
            "降成一阶后按可分离或一阶线性处理。"
          ]
        }
      ]
    },
    {
      id: "matrix",
      no: "七",
      name: "行列式与矩阵",
      blurb: "展开 · 穿脱 · 秩",
      exam: "线代地基",
      cards: [
        {
          id: "mx-det",
          kind: "cloze",
          freq: 4,
          tier: 1,
          title: "行列式性质与展开",
          hint: "化零降阶是主线：先用性质造零，再按行展开。",
          reveal: [
            { tex: "|A|=\\sum_{j}a_{ij}A_{ij},\\quad A_{ij}=(-1)^{i+j}M_{ij}", display: true },
            { tex: "|A^T|=|A|,\\quad |kA|=k^{n}|A|,\\quad |AB|=|A||B|", display: true },
            { tex: "\\text{上（下）三角行列式}=\\prod_{i} a_{ii}", display: true }
          ],
          holes: ["(-1)^{i+j}M_{ij}", "k^{n}|A|", "|A||B|", "\\prod_{i} a_{ii}"],
          mask: [
            "A_{ij}={{1}}",
            "|kA|={{2}},\\quad |AB|={{3}}",
            "\\text{三角行列式}={{4}}"
          ],
          warning: "|kA| 是 kⁿ|A|，不是 k|A|——每一行都提一个 k。"
        },
        {
          id: "mx-ops",
          kind: "cloze",
          freq: 5,
          tier: 1,
          title: "矩阵运算与穿脱原则",
          hint: "转置和求逆穿过乘积时要反序。",
          reveal: [
            { tex: "(AB)^T=B^TA^T,\\quad (AB)^{-1}=B^{-1}A^{-1}", display: true },
            { tex: "AA^*=A^*A=|A|E", display: true }
          ],
          holes: ["B^TA^T", "B^{-1}A^{-1}", "|A|E"],
          mask: [
            "(AB)^T={{1}},\\quad (AB)^{-1}={{2}}",
            "AA^*=A^*A={{3}}"
          ],
          notes: [
            "(A+B)^T=A^T+B^T，但 (A+B)⁻¹ 没有公式。",
            "(AB)^k 一般 ≠ A^kB^k。"
          ]
        },
        {
          id: "mx-inv",
          kind: "cloze",
          freq: 4,
          tier: 2,
          title: "伴随矩阵与求逆",
          hint: "二阶直接套：主对调、副变号，除以行列式。",
          reveal: [
            { tex: "A^{-1}=\\frac{A^*}{|A|},\\quad A\\text{ 可逆}\\iff|A|\\neq 0\\iff r(A)=n", display: true },
            { tex: "\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}^{-1}=\\frac{1}{ad-bc}\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}", display: true }
          ],
          holes: ["\\dfrac{A^*}{|A|}", "|A|\\neq 0", "ad-bc", "\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}"],
          mask: [
            "A^{-1}={{1}},\\quad \\text{可逆}\\iff{{2}}",
            "\\text{二阶分母：}{{3}},\\quad \\text{分子：}{{4}}"
          ],
          warning: "伴随矩阵是代数余子式的转置：A* 的第 i 行第 j 列元素是 A_{ji}。"
        },
        {
          id: "mx-rank",
          kind: "cloze",
          freq: 4,
          tier: 2,
          title: "秩的不等式",
          hint: "乘积不增、相加不超和、乘零压到 n。",
          reveal: [
            { tex: "r(AB)\\le\\min\\{r(A),r(B)\\},\\quad r(A+B)\\le r(A)+r(B)", display: true },
            { tex: "AB=O\\Rightarrow r(A)+r(B)\\le n\\quad(A\\text{ 为 }m\\times n)", display: true },
            { tex: "r(A^*)=\\begin{cases}n,&r(A)=n\\\\1,&r(A)=n-1\\\\0,&r(A)<n-1\\end{cases}", display: true }
          ],
          holes: ["\\min\\{r(A),r(B)\\}", "r(A)+r(B)", "\\le n", "n", "1", "0"],
          mask: [
            "r(AB)\\le{{1}},\\quad r(A+B)\\le{{2}}",
            "AB=O\\Rightarrow r(A)+r(B){{3}}",
            "r(A^*):\\ \\text{满秩}\\Rightarrow{{4}},\\ r(A)=n-1\\Rightarrow{{5}},\\ <n-1\\Rightarrow{{6}}"
          ]
        },
        {
          id: "mx-ex",
          kind: "example",
          freq: 4,
          tier: 1,
          title: "抽象行列式求值",
          problem: "A \\text{ 为 3 阶矩阵，}|A|=2，\\text{求 }|2A|\\text{ 与 }|A^*|",
          idea: "|kA|=kⁿ|A|；|A*|=|A|ⁿ⁻¹。",
          steps: [
            { tex: "|2A|=2^{3}|A|=8\\times 2=16" },
            { tex: "|A^*|=|A|^{3-1}=2^{2}=4" }
          ],
          answer: "16,\\ 4"
        }
      ]
    },
    {
      id: "linsys",
      no: "八",
      name: "向量与方程组",
      blurb: "秩判定 · 相关性 · 基础解系",
      exam: "线代大题 1",
      cards: [
        {
          id: "linsys-vec",
          kind: "cloze",
          freq: 4,
          tier: 2,
          title: "向量组线性相关",
          hint: "相关看秩：秩小于个数就相关。",
          reveal: [
            { tex: "\\text{相关}\\iff r(\\alpha_1,\\dots,\\alpha_s)<s;\\quad \\text{无关}\\iff r=s", display: true },
            { tex: "n+1\\text{ 个 }n\\text{ 维向量必相关}", display: true }
          ],
          holes: ["<s", "=s", "n+1"],
          mask: [
            "\\text{相关}\\iff r\\ {{1}},\\quad \\text{无关}\\iff r\\ {{2}}",
            "{{3}}\\text{ 个 }n\\text{ 维向量必相关}"
          ],
          notes: [
            "部分相关 ⇒ 整体相关；整体无关 ⇒ 部分无关。",
            "相关 ⟺ 存在不全为零的系数使线性组合为零向量。"
          ]
        },
        {
          id: "linsys-rank",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "Ax=b 解的判定",
          hint: "比较 r(A) 与 r(A|b)，再和未知数个数 n 比。",
          reveal: [
            { tex: "r(A)\\neq r(\\overline A)\\Rightarrow\\text{无解}", display: true },
            { tex: "r(A)=r(\\overline A)=n\\Rightarrow\\text{唯一解}", display: true },
            { tex: "r(A)=r(\\overline A)<n\\Rightarrow\\text{无穷多解，基础解系有 }n-r(A)\\text{ 个向量}", display: true }
          ],
          holes: ["\\text{无解}", "\\text{唯一解}", "\\text{无穷多解}", "n-r(A)"],
          mask: [
            "r(A)\\neq r(\\overline A)\\Rightarrow {{1}}",
            "r(A)=r(\\overline A)=n\\Rightarrow {{2}}",
            "r(A)=r(\\overline A)<n\\Rightarrow {{3}}\\text{，基础解系有 }{{4}}\\text{ 个向量}"
          ]
        },
        {
          id: "linsys-general",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "齐次与非齐次通解",
          hint: "齐次通解是基础解系的线性组合；非齐次再加一个特解。",
          reveal: [
            { tex: "Ax=0:\\quad x=k_{1}\\xi_{1}+\\cdots+k_{n-r}\\xi_{n-r}", display: true },
            { tex: "Ax=b:\\quad x=\\text{齐次通解}+\\eta^{*}", display: true }
          ],
          holes: ["k_{1}\\xi_{1}+\\cdots+k_{n-r}\\xi_{n-r}", "\\text{齐次通解}", "\\eta^{*}"],
          mask: [
            "Ax=0:\\ x={{1}}",
            "Ax=b:\\ x={{2}}+{{3}}"
          ]
        },
        {
          id: "linsys-ex",
          kind: "example",
          freq: 5,
          tier: 2,
          title: "求基础解系",
          problem: "A=\\begin{pmatrix}1&1\\\\2&2\\end{pmatrix}，求 Ax=0 的基础解系。",
          idea: "先化行最简求秩，自由未知量个数 = n-r，再取一组基。",
          steps: [
            { tex: "A\\xrightarrow{r}\\begin{pmatrix}1&1\\\\0&0\\end{pmatrix},\\ r(A)=1,\\ n=2,\\ n-r=1" },
            { tex: "x_{1}=-x_{2}。\\text{令 }x_{2}=1,\\ \\xi=(-1,1)^{T}" },
            { tex: "\\text{通解：}k(-1,1)^{T},\\ k\\in\\mathbb{R}" }
          ],
          answer: "\\xi=(-1,1)^{T}"
        },
        {
          id: "linsys-cramer",
          kind: "cloze",
          freq: 2,
          tier: 2,
          title: "克拉默法则",
          hint: "系数行列式不为零时，解可以写成行列式的比值。",
          reveal: [
            { tex: "D=|A|\\neq0\\Rightarrow x_j=\\frac{D_j}{D},\\quad D_j\\text{ 为把 }D\\text{ 的第 }j\\text{ 列换成 }b", display: true }
          ],
          holes: ["|A|\\neq0", "\\dfrac{D_j}{D}"],
          mask: [
            "{{1}}\\Rightarrow x_j={{2}}"
          ],
          notes: [
            "D=0 时法则失效，回到秩的判定。"
          ]
        }
      ]
    },
    {
      id: "eigen",
      no: "九",
      name: "特征值与二次型",
      blurb: "特征方程 · 对角化 · 二次型",
      exam: "线代大题 2",
      cards: [
        {
          id: "eigen-def",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "特征值与特征向量",
          hint: "先解 |λE-A|=0 得 λ，再对每个 λ 解齐次方程。",
          reveal: [
            { tex: "|\\lambda E-A|=0 \\Rightarrow\\lambda,\\quad (\\lambda E-A)x=0 \\Rightarrow\\xi", display: true },
            { tex: "A\\xi=\\lambda\\xi", display: true }
          ],
          holes: ["|\\lambda E-A|=0", "(\\lambda E-A)x=0", "\\lambda\\xi"],
          mask: [
            "{{1}}\\Rightarrow\\lambda",
            "{{2}}\\Rightarrow\\xi",
            "A\\xi={{3}}"
          ]
        },
        {
          id: "eigen-trace",
          kind: "cloze",
          freq: 4,
          tier: 1,
          title: "行列式与迹",
          hint: "不用求完特征多项式也能先核对：积是行列式，和是迹。",
          reveal: [
            { tex: "|A|=\\lambda_{1}\\lambda_{2}\\cdots\\lambda_{n},\\quad \\mathrm{tr}(A)=\\sum a_{ii}=\\lambda_{1}+\\cdots+\\lambda_{n}", display: true }
          ],
          holes: [
            "\\lambda_{1}\\lambda_{2}\\cdots\\lambda_{n}",
            "\\sum a_{ii}",
            "\\lambda_{1}+\\cdots+\\lambda_{n}"
          ],
          mask: [
            "|A|={{1}}",
            "\\mathrm{tr}(A)={{2}}={{3}}"
          ]
        },
        {
          id: "eigen-diag",
          kind: "cloze",
          freq: 4,
          tier: 3,
          title: "可相似对角化",
          hint: "每个特征值的几何重数要够；实对称矩阵不用验，一定可以。",
          reveal: [
            { tex: "\\text{每个 }\\lambda_{i}\\text{：代数重数 }=\\text{几何重数 }n-r(\\lambda_{i}E-A)", display: true }
          ],
          holes: ["\\text{代数重数}=\\text{几何重数}", "n-r(\\lambda_{i}E-A)", "\\text{一定可对角化}", "\\text{正交}"],
          mask: [
            "\\text{可对角化：每个 }\\lambda_{i}\\text{ 的 }{{1}}",
            "\\text{几何重数}={{2}}",
            "\\text{实对称矩阵}{{3}}",
            "\\text{不同特征值的特征向量两两 }{{4}}"
          ],
          notes: [
            "实对称矩阵一定可对角化。",
            "不同特征值的特征向量两两正交。"
          ]
        },
        {
          id: "eigen-sym",
          kind: "cloze",
          freq: 4,
          tier: 3,
          title: "实对称与施密特正交化",
          hint: "实对称必可正交对角化；只有同一特征值内部的向量才需要施密特。",
          reveal: [
            { tex: "Q^TAQ=\\Lambda,\\quad Q^{-1}=Q^T", display: true },
            { tex: "\\beta_1=\\alpha_1,\\quad \\beta_2=\\alpha_2-\\frac{(\\alpha_2,\\beta_1)}{(\\beta_1,\\beta_1)}\\beta_1,\\quad \\gamma_i=\\frac{\\beta_i}{\\|\\beta_i\\|}", display: true }
          ],
          holes: ["Q^T", "\\dfrac{(\\alpha_2,\\beta_1)}{(\\beta_1,\\beta_1)}\\beta_1", "\\dfrac{\\beta_i}{\\|\\beta_i\\|}"],
          mask: [
            "Q^{-1}={{1}}",
            "\\beta_2=\\alpha_2-{{2}},\\quad \\gamma_i={{3}}"
          ],
          notes: [
            "流程：求 λ → 解特征向量 → 同一 λ 内部施密特 → 单位化 → 拼 Q。"
          ]
        },
        {
          id: "eigen-quad",
          kind: "cloze",
          freq: 4,
          tier: 3,
          title: "二次型化标准形与正定",
          hint: "正交变换化标准形，系数就是特征值；正定看顺序主子式。",
          reveal: [
            { tex: "x=Qy:\\ f=x^TAx=\\lambda_1y_1^2+\\lambda_2y_2^2+\\cdots+\\lambda_ny_n^2", display: true },
            { tex: "\\text{正定}\\iff\\lambda_i>0\\ (\\forall i)\\iff\\text{各阶顺序主子式}>0", display: true }
          ],
          holes: ["\\lambda_1y_1^2+\\lambda_2y_2^2+\\cdots+\\lambda_ny_n^2", "\\lambda_i>0", "\\text{顺序主子式}"],
          mask: [
            "x=Qy\\Rightarrow f={{1}}",
            "\\text{正定}\\iff{{2}}\\iff\\text{各阶}{{3}}>0"
          ],
          notes: [
            "标准形中平方项个数 = 秩；正惯性指数 = 正特征值个数。"
          ]
        },
        {
          id: "eigen-ex",
          kind: "example",
          freq: 5,
          tier: 2,
          title: "对角矩阵的特征值",
          problem: "A=\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}，求特征值，并判断能否对角化。",
          idea: "对角阵的特征值就是对角元；两个不同特征值 ⇒ 一定可对角化。",
          steps: [
            { tex: "|\\lambda E-A|=\\begin{vmatrix}\\lambda-2&0\\\\0&\\lambda-3\\end{vmatrix}=(\\lambda-2)(\\lambda-3)=0" },
            { tex: "\\lambda_{1}=2,\\ \\lambda_{2}=3" },
            { tex: "\\text{两个单根，代数重数=几何重数，可对角化。}" }
          ],
          answer: "\\lambda=2,3\\text{（可对角化）}"
        },
        {
          id: "eigen-abstract",
          kind: "cloze",
          freq: 3,
          tier: 3,
          title: "抽象矩阵的特征值",
          hint: "A 的特征值是 λ，运算后的矩阵特征值跟着做同样运算。",
          reveal: [
            { tex: "f(A)\\text{ 的特征值}=f(\\lambda);\\quad A^{-1}:\\ \\frac1\\lambda;\\quad A^*:\\ \\frac{|A|}{\\lambda}", display: true }
          ],
          holes: ["f(\\lambda)", "\\dfrac1\\lambda", "\\dfrac{|A|}{\\lambda}"],
          mask: [
            "f(A)\\Rightarrow{{1}},\\quad A^{-1}\\Rightarrow{{2}},\\quad A^*\\Rightarrow{{3}}"
          ],
          notes: [
            "特征向量不变，还是原来那个 ξ。",
            "A* 的结论要求 λ≠0。"
          ]
        }
      ]
    },
    {
      id: "master",
      no: "十",
      name: "公式全表",
      blurb: "全部数二公式 · 按档位过一遍",
      exam: "考前必过",
      virtual: true,
      cards: []
    },
    {
      id: "mschool",
      no: "十一",
      name: "中学锦囊",
      blurb: "地基公式 · 随用随查",
      exam: "全程在用",
      soft: true,
      cards: [
        {
          id: "ms-exp",
          kind: "cloze",
          freq: 5,
          tier: 1,
          title: "指数与对数运算",
          hint: "幂指函数取对数是考研日常操作。",
          reveal: [
            { tex: "a^ma^n=a^{m+n},\\quad (a^m)^n=a^{mn},\\quad a^{-n}=\\frac1{a^n}", display: true },
            { tex: "\\ln ab=\\ln a+\\ln b,\\quad \\ln a^b=b\\ln a,\\quad a^b=e^{b\\ln a}", display: true }
          ],
          holes: ["a^{m+n}", "a^{mn}", "\\ln a+\\ln b", "b\\ln a", "e^{b\\ln a}"],
          mask: [
            "a^ma^n={{1}},\\quad (a^m)^n={{2}}",
            "\\ln ab={{3}},\\quad \\ln a^b={{4}}",
            "a^b={{5}}"
          ]
        },
        {
          id: "ms-factor",
          kind: "cloze",
          freq: 5,
          tier: 1,
          title: "因式分解与韦达",
          hint: "拆项、约分、求特征根，天天见。",
          reveal: [
            { tex: "a^2-b^2=(a+b)(a-b),\\quad a^3\\pm b^3=(a\\pm b)(a^2\\mp ab+b^2)", display: true },
            { tex: "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a},\\quad x_1+x_2=-\\frac ba,\\quad x_1x_2=\\frac ca", display: true }
          ],
          holes: ["(a+b)(a-b)", "(a\\pm b)(a^2\\mp ab+b^2)", "\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}", "-\\dfrac ba", "\\dfrac ca"],
          mask: [
            "a^2-b^2={{1}}",
            "a^3\\pm b^3={{2}}",
            "x={{3}}",
            "x_1+x_2={{4}},\\quad x_1x_2={{5}}"
          ]
        },
        {
          id: "ms-trig-id",
          kind: "cloze",
          freq: 5,
          tier: 1,
          title: "同角三角关系",
          hint: "三角代换后化简全靠这几个平方关系。",
          reveal: [
            { tex: "\\sin^2x+\\cos^2x=1,\\quad 1+\\tan^2x=\\sec^2x,\\quad 1+\\cot^2x=\\csc^2x", display: true }
          ],
          holes: ["\\sin^2x+\\cos^2x", "1+\\tan^2x", "\\sec^2x", "\\csc^2x"],
          mask: [
            "{{1}}=1",
            "{{2}}={{3}}",
            "1+\\cot^2x={{4}}"
          ]
        },
        {
          id: "ms-trig-val",
          kind: "cloze",
          freq: 5,
          tier: 1,
          title: "特殊角函数值",
          hint: "定积分最后一步算数值，错这里最冤。",
          reveal: [
            { tex: "\\sin:\\ 0,\\ \\tfrac12,\\ \\tfrac{\\sqrt2}2,\\ \\tfrac{\\sqrt3}2,\\ 1", display: true },
            { tex: "\\tan:\\ 0,\\ \\tfrac{\\sqrt3}3,\\ 1,\\ \\sqrt3,\\ \\text{不存在}", display: true },
            { tex: "\\text{角度顺序 }0,\\tfrac\\pi6,\\tfrac\\pi4,\\tfrac\\pi3,\\tfrac\\pi2", display: true }
          ],
          holes: ["\\tfrac12", "\\tfrac{\\sqrt2}2", "\\tfrac{\\sqrt3}2", "\\tfrac{\\sqrt3}3", "\\sqrt3"],
          mask: [
            "\\sin:\\ 0,\\ {{1}},\\ {{2}},\\ {{3}},\\ 1",
            "\\tan:\\ 0,\\ {{4}},\\ 1,\\ {{5}},\\ \\text{不存在}"
          ],
          notes: [
            "cos 把 sin 倒过来背；角度顺序固定 0, π/6, π/4, π/3, π/2。"
          ]
        },
        {
          id: "ms-induct",
          kind: "cloze",
          freq: 5,
          tier: 1,
          title: "诱导公式",
          hint: "口诀：奇变偶不变，符号看象限。",
          reveal: [
            { tex: "\\sin(\\tfrac\\pi2-x)=\\cos x,\\quad \\cos(\\tfrac\\pi2-x)=\\sin x", display: true },
            { tex: "\\sin(\\pi-x)=\\sin x,\\quad \\cos(\\pi-x)=-\\cos x", display: true },
            { tex: "\\sin(-x)=-\\sin x,\\quad \\cos(-x)=\\cos x", display: true }
          ],
          holes: ["\\cos x", "\\sin x", "-\\cos x", "-\\sin x"],
          mask: [
            "\\sin(\\tfrac\\pi2-x)={{1}},\\quad \\cos(\\tfrac\\pi2-x)={{2}}",
            "\\cos(\\pi-x)={{3}}",
            "\\sin(-x)={{4}}"
          ],
          notes: [
            "对称区间积分、华里士公式的推导都靠它。"
          ]
        },
        {
          id: "ms-sum",
          kind: "cloze",
          freq: 4,
          tier: 1,
          title: "等差等比数列求和",
          hint: "夹逼与数列题里偶尔要用。",
          reveal: [
            { tex: "\\text{等差：}S_n=\\frac{n(a_1+a_n)}2=na_1+\\frac{n(n-1)}2d", display: true },
            { tex: "\\text{等比：}S_n=\\frac{a_1(1-q^n)}{1-q},\\quad |q|<1\\Rightarrow S_{\\infty}=\\frac{a_1}{1-q}", display: true }
          ],
          holes: ["\\dfrac{n(a_1+a_n)}2", "\\dfrac{a_1(1-q^n)}{1-q}", "\\dfrac{a_1}{1-q}"],
          mask: [
            "\\text{等差：}S_n={{1}}",
            "\\text{等比：}S_n={{2}},\\quad S_{\\infty}={{3}}"
          ]
        },
        {
          id: "ms-quad",
          kind: "cloze",
          freq: 4,
          tier: 1,
          title: "二次函数配方",
          hint: "配方看最值、定符号，积分里凑平方也用。",
          reveal: [
            { tex: "ax^2+bx+c=a\\left(x+\\frac b{2a}\\right)^2+\\frac{4ac-b^2}{4a}", display: true }
          ],
          holes: ["x+\\dfrac b{2a}", "\\dfrac{4ac-b^2}{4a}"],
          mask: [
            "ax^2+bx+c=a({{1}})^2+{{2}}"
          ],
          notes: [
            "Δ>0 两实根，Δ=0 重根，Δ<0 且 a>0 时恒正。"
          ]
        },
        {
          id: "ms-trig-sum",
          kind: "cloze",
          freq: 5,
          tier: 2,
          title: "和差倍角与降幂",
          hint: "积分降次必备：平方化二倍角。",
          reveal: [
            { tex: "\\sin(\\alpha\\pm\\beta)=\\sin\\alpha\\cos\\beta\\pm\\cos\\alpha\\sin\\beta", display: true },
            { tex: "\\cos(\\alpha\\pm\\beta)=\\cos\\alpha\\cos\\beta\\mp\\sin\\alpha\\sin\\beta", display: true },
            { tex: "\\sin2x=2\\sin x\\cos x,\\quad \\cos2x=2\\cos^2x-1=1-2\\sin^2x", display: true },
            { tex: "\\sin^2x=\\frac{1-\\cos2x}2,\\quad \\cos^2x=\\frac{1+\\cos2x}2", display: true }
          ],
          holes: [
            "\\sin\\alpha\\cos\\beta\\pm\\cos\\alpha\\sin\\beta",
            "\\cos\\alpha\\cos\\beta\\mp\\sin\\alpha\\sin\\beta",
            "2\\sin x\\cos x",
            "\\dfrac{1-\\cos2x}2",
            "\\dfrac{1+\\cos2x}2"
          ],
          mask: [
            "\\sin(\\alpha\\pm\\beta)={{1}}",
            "\\cos(\\alpha\\pm\\beta)={{2}}",
            "\\sin2x={{3}}",
            "\\sin^2x={{4}},\\quad \\cos^2x={{5}}"
          ]
        },
        {
          id: "ms-aux",
          kind: "cloze",
          freq: 4,
          tier: 2,
          title: "辅助角公式",
          hint: "a sin + b cos 合并成一个正弦。",
          reveal: [
            { tex: "a\\sin x+b\\cos x=\\sqrt{a^2+b^2}\\sin(x+\\varphi),\\quad \\tan\\varphi=\\frac ba", display: true }
          ],
          holes: ["\\sqrt{a^2+b^2}", "\\sin(x+\\varphi)", "\\dfrac ba"],
          mask: [
            "a\\sin x+b\\cos x={{1}}{{2}},\\quad \\tan\\varphi={{3}}"
          ]
        },
        {
          id: "ms-amgm",
          kind: "cloze",
          freq: 4,
          tier: 2,
          title: "均值与绝对值不等式",
          hint: "求最值、放缩证明两件套。",
          reveal: [
            { tex: "\\frac{a+b}2\\ge\\sqrt{ab}\\ (a,b>0),\\quad a^2+b^2\\ge 2ab", display: true },
            { tex: "\\big||a|-|b|\\big|\\le|a\\pm b|\\le|a|+|b|", display: true }
          ],
          holes: ["\\sqrt{ab}", "2ab", "|a|+|b|"],
          mask: [
            "\\dfrac{a+b}2\\ge{{1}},\\quad a^2+b^2\\ge{{2}}",
            "|a\\pm b|\\le{{3}}"
          ],
          notes: [
            "等号条件：a=b（均值）；a,b 同号或其一为 0（|a+b| 右等号）。"
          ]
        },
        {
          id: "ms-circle",
          kind: "cloze",
          freq: 4,
          tier: 2,
          title: "圆的方程",
          hint: "二重积分的区域边界，先配方看清圆心半径。",
          reveal: [
            { tex: "(x-a)^2+(y-b)^2=r^2:\\ \\text{圆心 }(a,b),\\ \\text{半径 }r", display: true },
            { tex: "x^2+y^2+Dx+Ey+F=0\\ \\xrightarrow{\\text{配方}}\\ \\text{标准形}", display: true }
          ],
          holes: ["(a,b)", "r", "\\text{配方}"],
          mask: [
            "(x-a)^2+(y-b)^2=r^2:\\ \\text{圆心 }{{1}},\\ \\text{半径 }{{2}}",
            "\\text{一般式先}{{3}}"
          ]
        }
      ]
    }
  ]
};
