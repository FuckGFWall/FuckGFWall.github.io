import { LAND_POINTS } from "./globe-land.js";

const WIDTH = 640;
const HEIGHT = 620;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;
const RADIUS = 216;
const FULL_TURN = Math.PI * 2;
const TO_RADIANS = Math.PI / 180;
const ROTATION_MS = 48000;
const INITIAL_LONGITUDE = -18;
const VIEW_LATITUDE = 18 * TO_RADIANS;
const VIEW_TILT = -12 * TO_RADIANS;
const VIEW_SIN = Math.sin(VIEW_LATITUDE);
const VIEW_COS = Math.cos(VIEW_LATITUDE);
const TILT_SIN = Math.sin(VIEW_TILT);
const TILT_COS = Math.cos(VIEW_TILT);

// Representative locations and routes for the illustration.
const LOCATIONS = {
  SEA: [-122.33, 47.61],
  SFO: [-122.42, 37.77],
  DFW: [-96.80, 32.78],
  MEX: [-99.13, 19.43],
  IAD: [-77.46, 38.95],
  MIA: [-80.19, 25.76],
  BOG: [-74.08, 4.71],
  SCL: [-70.67, -33.45],
  GRU: [-46.63, -23.55],
  EZE: [-58.38, -34.60],
  LHR: [-0.13, 51.51],
  MAD: [-3.70, 40.42],
  FRA: [8.68, 50.11],
  ARN: [18.07, 59.33],
  IST: [28.98, 41.01],
  LOS: [3.38, 6.52],
  CPT: [18.42, -33.92],
  NBO: [36.82, -1.29],
  DXB: [55.27, 25.20],
  BOM: [72.88, 19.08],
  DEL: [77.21, 28.61],
  SIN: [103.82, 1.35],
  HKG: [114.17, 22.32],
  ICN: [126.98, 37.57],
  NRT: [139.69, 35.68],
  SYD: [151.21, -33.87],
  AKL: [174.76, -36.85],
};
const LINKS = [
  ["SEA", "IAD"], ["SFO", "DFW"], ["SFO", "NRT"], ["DFW", "MEX"],
  ["IAD", "LHR"], ["IAD", "MIA"], ["MIA", "BOG"], ["MIA", "GRU"],
  ["BOG", "SCL"], ["GRU", "EZE"], ["GRU", "CPT"], ["CPT", "NBO"],
  ["LHR", "MAD"], ["LHR", "FRA"], ["LHR", "ARN"], ["MAD", "LOS"],
  ["FRA", "IST"], ["IST", "DXB"], ["NBO", "DXB"], ["DXB", "BOM"],
  ["BOM", "DEL"], ["BOM", "SIN"], ["SIN", "HKG"], ["SIN", "SYD"],
  ["HKG", "NRT"], ["ICN", "NRT"], ["SYD", "AKL"],
];
const LAND_COLORS = ["#83502e", "#a36137", "#c67946", "#e59055", "#f7a969"];

function toSphere([longitude, latitude]) {
  const lon = longitude * TO_RADIANS;
  const lat = latitude * TO_RADIANS;
  const latitudeRadius = Math.cos(lat);
  return [latitudeRadius * Math.sin(lon), Math.sin(lat), latitudeRadius * Math.cos(lon)];
}

function makeRoute(start, end, index) {
  const dot = start[0] * end[0] + start[1] * end[1] + start[2] * end[2];
  const angle = Math.acos(Math.max(-1, Math.min(1, dot)));
  const arcHeight = 0.04 + angle * 0.10;
  const arcSteps = 48;
  const sinAngle = Math.sin(angle);
  // Great-circle interpolation keeps each line attached to both endpoints.
  const points = Array.from({ length: arcSteps + 1 }, (_, step) => {
    const t = step / arcSteps;
    const from = Math.sin((1 - t) * angle) / sinAngle;
    const to = Math.sin(t * angle) / sinAngle;
    const elevation = 1 + Math.sin(t * Math.PI) * arcHeight;
    return start.map((component, axis) => (component * from + end[axis] * to) * elevation);
  });
  return { points, duration: 2600 + angle * 2100, phase: (index * 0.37) % 1 };
}

const land = LAND_POINTS.map(toSphere);
const sites = Object.fromEntries(Object.entries(LOCATIONS).map(([name, coordinates]) => [name, toSphere(coordinates)]));
const sitePoints = Object.values(sites);
const routes = LINKS.map(([from, to], index) => makeRoute(sites[from], sites[to], index));
const grid = [
  ...[-60, -30, 0, 30, 60].map((latitude) =>
    Array.from({ length: 121 }, (_, i) => toSphere([i * 3 - 180, latitude]))),
  ...[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((longitude) =>
    Array.from({ length: 61 }, (_, i) => toSphere([longitude, i * 3 - 90]))),
];

function paintBackdrop(context) {
  const atmosphere = context.createRadialGradient(CENTER_X, CENTER_Y, RADIUS * 0.45, CENTER_X, CENTER_Y, 308);
  atmosphere.addColorStop(0, "#e36d3033");
  atmosphere.addColorStop(0.75, "#bd5a1e16");
  atmosphere.addColorStop(1, "#bd5a1e00");
  context.fillStyle = atmosphere;
  context.fillRect(0, 0, WIDTH, HEIGHT);

  // Stationary guides frame the rotating globe and its network.
  context.strokeStyle = "#f3a46329";
  context.lineWidth = 1;
  context.beginPath();
  context.arc(CENTER_X, CENTER_Y, 262, 0, FULL_TURN);
  context.stroke();
  context.beginPath();
  context.ellipse(CENTER_X, CENTER_Y, 288, 128, -0.52, 0, FULL_TURN);
  context.stroke();
  context.setLineDash([2, 7]);
  context.beginPath();
  context.moveTo(CENTER_X, 30);
  context.lineTo(CENTER_X, HEIGHT - 30);
  context.moveTo(18, CENTER_Y);
  context.lineTo(WIDTH - 18, CENTER_Y);
  context.stroke();
  context.setLineDash([]);

  const surface = context.createRadialGradient(245, 225, 24, 359, 354, 293);
  surface.addColorStop(0, "#703719");
  surface.addColorStop(0.46, "#492715");
  surface.addColorStop(0.78, "#2d1b12");
  surface.addColorStop(1, "#1c120e");
  context.fillStyle = surface;
  context.beginPath();
  context.arc(CENTER_X, CENTER_Y, RADIUS, 0, FULL_TURN);
  context.fill();
  const rim = context.createLinearGradient(175, 100, 473, 532);
  rim.addColorStop(0, "#ffc28d90");
  rim.addColorStop(0.6, "#e1804644");
  rim.addColorStop(1, "#c16a3629");
  context.strokeStyle = rim;
  context.stroke();
}

function createRenderer(canvas, context, backdrop, backdropContext) {
  let longitudeSin = 0;
  let longitudeCos = 1;
  // Reuse projection buffers throughout the frame.
  const screen = { x: 0, y: 0, depth: 0, outside: false };
  const pulsePoint = [0, 0, 0];

  function project([x, y, z]) {
    const horizontal = x * longitudeCos - z * longitudeSin;
    const forward = x * longitudeSin + z * longitudeCos;
    const vertical = y * VIEW_COS - forward * VIEW_SIN;
    screen.depth = y * VIEW_SIN + forward * VIEW_COS;
    screen.x = CENTER_X + RADIUS * (horizontal * TILT_COS - vertical * TILT_SIN);
    screen.y = CENTER_Y - RADIUS * (horizontal * TILT_SIN + vertical * TILT_COS);
    screen.outside = horizontal * horizontal + vertical * vertical > 1;
  }

  function strokePath(points, raised = false) {
    let penDown = false;
    for (const point of points) {
      project(point);
      if (screen.depth > 0 || (raised && screen.outside)) {
        if (penDown) context.lineTo(screen.x, screen.y);
        else context.moveTo(screen.x, screen.y);
        penDown = true;
      } else {
        // Reopen the path only when the globe no longer occludes it.
        penDown = false;
      }
    }
  }

  function drawLand() {
    const paths = LAND_COLORS.map(() => new Path2D());
    for (const point of land) {
      project(point);
      if (screen.depth <= 0.015) continue;
      const light = 0.66 * screen.depth + 0.34 * (1 - (screen.y - 94) / (2 * RADIUS));
      const shade = Math.max(0, Math.min(paths.length - 1, Math.floor(light * paths.length)));
      const dotRadius = 0.65 + screen.depth * 0.91;
      paths[shade].moveTo(screen.x + dotRadius, screen.y);
      paths[shade].arc(screen.x, screen.y, dotRadius, 0, FULL_TURN);
    }
    paths.forEach((path, index) => {
      context.fillStyle = LAND_COLORS[index];
      context.fill(path);
    });
  }

  function circle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, FULL_TURN);
    context.fill();
  }

  function drawSignal(route, time) {
    const travel = (time / route.duration + route.phase) % 1;
    const step = travel * (route.points.length - 1);
    const segment = Math.floor(step);
    const blend = step - segment;
    const start = route.points[segment];
    const end = route.points[segment + 1];
    for (let axis = 0; axis < 3; axis++) {
      pulsePoint[axis] = start[axis] + (end[axis] - start[axis]) * blend;
    }
    project(pulsePoint);
    if (screen.depth <= 0 && !screen.outside) return;

    const opacity = Math.min(1, travel * 12, (1 - travel) * 12);
    const { x, y } = screen;
    context.strokeStyle = "#ffc78e";
    context.globalAlpha = opacity * 0.8;
    context.lineWidth = 1.45;
    context.beginPath();
    context.moveTo(x, y);
    for (let i = segment; i >= Math.max(0, segment - 3); i--) {
      project(route.points[i]);
      if (screen.depth <= 0 && !screen.outside) break;
      context.lineTo(screen.x, screen.y);
    }
    context.stroke();
    context.globalAlpha = opacity * 0.17;
    circle(x, y, 5.3, "#ff9f54");
    context.globalAlpha = opacity;
    circle(x, y, 1.85, "#fff2d9");
  }

  function drawSite(point, index, time) {
    project(point);
    if (screen.depth <= 0.015) return;

    const { x, y, depth } = screen;
    const visibility = Math.min(1, depth * 5);
    const phase = (time / (2900 + (index % 5) * 270) + index * 0.41) % 1;
    const intensity = ((1 - Math.cos(phase * FULL_TURN)) / 2) ** 3;
    context.globalAlpha = visibility * (0.10 + intensity * 0.16);
    circle(x, y, 5.4 + intensity * 3.2, "#ff8b3c");
    context.globalAlpha = visibility * (0.62 + intensity * 0.38);
    circle(x, y, 2 + intensity * 1.25, "#ffab63");
    circle(x, y, 0.9 + intensity * 0.45, "#fff1d9");
  }

  function render(time) {
    const longitude = INITIAL_LONGITUDE * TO_RADIANS + (time % ROTATION_MS) / ROTATION_MS * FULL_TURN;
    longitudeSin = Math.sin(longitude);
    longitudeCos = Math.cos(longitude);

    context.globalAlpha = 1;
    context.clearRect(0, 0, WIDTH, HEIGHT);
    context.drawImage(backdrop, 0, 0, WIDTH, HEIGHT);
    context.strokeStyle = "#ffa96726";
    context.lineWidth = 0.65;
    context.beginPath();
    grid.forEach((line) => strokePath(line));
    context.stroke();
    drawLand();

    context.strokeStyle = "#ff9b53";
    context.globalAlpha = 0.5;
    context.lineWidth = 1;
    context.beginPath();
    routes.forEach(({ points }) => strokePath(points, true));
    context.stroke();

    routes.forEach((route) => drawSignal(route, time));
    sitePoints.forEach((point, index) => drawSite(point, index, time));
  }

  return {
    render,
    resize(width, height) {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const pixelWidth = Math.max(1, Math.round(width * pixelRatio));
      const pixelHeight = Math.max(1, Math.round(height * pixelRatio));
      canvas.width = backdrop.width = pixelWidth;
      canvas.height = backdrop.height = pixelHeight;
      context.setTransform(pixelWidth / WIDTH, 0, 0, pixelHeight / HEIGHT, 0, 0);
      backdropContext.setTransform(pixelWidth / WIDTH, 0, 0, pixelHeight / HEIGHT, 0, 0);
      context.lineCap = "round";
      context.lineJoin = "round";
      paintBackdrop(backdropContext);
    },
  };
}

export function initNetworkGlobe(labels) {
  const canvas = document.querySelector("#network-globe");
  const visual = canvas?.parentElement;
  const fallback = visual?.querySelector("[data-globe-fallback]");
  const toggle = document.querySelector("[data-globe-toggle]");
  if (!canvas || !visual || !fallback || !toggle || !("Path2D" in window)) return;

  const backdrop = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const backdropContext = backdrop.getContext("2d");
  if (!context || !backdropContext) return;

  const renderer = createRenderer(canvas, context, backdrop, backdropContext);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible = !("IntersectionObserver" in window);
  let paused = false;
  let frame = null;
  let previousTime = null;
  let elapsed = 0;

  function animate(now) {
    if (previousTime !== null) elapsed += Math.min(now - previousTime, 50);
    previousTime = now;
    renderer.render(elapsed);
    frame = requestAnimationFrame(animate);
  }

  function updatePlayback() {
    toggle.hidden = reducedMotion.matches;
    toggle.textContent = paused ? labels.resume : labels.pause;
    const playing = visible && !paused && !reducedMotion.matches && !document.hidden;
    if (playing && frame === null) frame = requestAnimationFrame(animate);
    if (!playing && frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
      previousTime = null;
    }
  }

  function resize() {
    const { width, height } = visual.getBoundingClientRect();
    if (!width || !height) return;
    renderer.resize(width, height);
    renderer.render(elapsed);
  }

  resize();
  canvas.hidden = false;
  fallback.hidden = true;

  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(visual);
  else window.addEventListener("resize", resize);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    }).observe(visual);
  }
  toggle.addEventListener("click", () => {
    paused = !paused;
    updatePlayback();
  });
  reducedMotion.addEventListener("change", updatePlayback);
  document.addEventListener("visibilitychange", updatePlayback);
  updatePlayback();
}
