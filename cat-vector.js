/* A self-contained SVG cat character: no GIF, video, or external asset needed. */
const catWorld = document.querySelector('#cat-world');
const catDrawing = (activity) => `
<svg class="svg-cat ${activity}" viewBox="0 0 240 165" role="img" aria-label="Animated cat">
  <g class="tail"><path d="M177 104 C229 93 230 45 206 37 C190 32 188 48 201 53 C213 59 205 78 176 80"/></g>
  <ellipse class="body" cx="133" cy="101" rx="70" ry="43"/>
  <ellipse class="belly" cx="130" cy="112" rx="44" ry="25"/>
  <g class="back-leg"><path d="M165 121 L174 148 Q178 157 164 157 L150 157 L151 120"/></g>
  <g class="front-leg leg-a"><path d="M87 118 L82 149 Q80 158 94 158 L106 158 L109 118"/></g>
  <g class="front-leg leg-b"><path d="M121 119 L120 148 Q119 158 133 158 L144 158 L144 117"/></g>
  <g class="head"><path class="ear" d="M61 50 L72 12 L92 48"/><path class="ear" d="M105 47 L125 14 L127 58"/><path class="inner-ear" d="M68 43 L74 25 L82 45"/><path class="inner-ear" d="M111 43 L122 27 L120 49"/>
  <circle class="face" cx="93" cy="68" r="39"/><ellipse class="muzzle" cx="84" cy="83" rx="20" ry="13"/><ellipse class="muzzle" cx="103" cy="83" rx="20" ry="13"/>
  <ellipse class="eye" cx="79" cy="66" rx="8" ry="10"/><ellipse class="eye" cx="106" cy="66" rx="8" ry="10"/><circle class="eye-glint" cx="77" cy="63" r="2.5"/><circle class="eye-glint" cx="104" cy="63" r="2.5"/>
  <path class="nose" d="M91 78 Q96 75 101 78 Q96 84 91 78"/><path class="mouth" d="M96 83 Q91 90 85 86 M96 83 Q101 90 108 86"/>
  <path class="whisker" d="M72 80 L35 74 M72 87 L32 91 M113 80 L146 74 M113 87 L150 92"/></g>
  <g class="groom-paw"><path d="M107 114 L81 72 Q76 62 86 58 Q98 56 103 68 L125 108"/></g>
  <g class="sleep-mark"><text x="36" y="27">z</text><text x="51" y="16">z</text><text x="67" y="7">z</text></g>
</svg>`;
catWorld.innerHTML = `
 <div class="svg-cat-scene sleep-scene" aria-hidden="true">${catDrawing('sleeping')}</div>
 <div class="svg-cat-scene groom-scene" aria-hidden="true">${catDrawing('grooming')}</div>
 <button id="cat-secret" class="svg-cat-scene walk-scene" aria-label="A walking cat">${catDrawing('walking')}</button>`;
