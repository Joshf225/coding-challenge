import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="space-loader">
        <div className="astronaut">
          <div className="astronaut-helmet">
            <div className="helmet-glass">
              <div className="helmet-inner-glass" />
              <div className="helmet-reflection" />
            </div>
            <div className="antenna" />
          </div>
          <div className="astronaut-body">
            <div className="suit-pattern" />
            <div className="suit-details" />
            <div className="backpack">
              <div className="tank tank-1" />
              <div className="tank tank-2" />
              <div className="pipe" />
            </div>
            <div className="arm arm-left">
              <div className="glove" />
            </div>
            <div className="arm arm-right">
              <div className="glove" />
            </div>
            <div className="leg leg-left">
              <div className="boot" />
            </div>
            <div className="leg leg-right">
              <div className="boot" />
            </div>
          </div>
        </div>
        <div className="space-environment">
          <div className="stars-container">
            <div className="stars stars-near" />
            <div className="stars stars-mid" />
            <div className="stars stars-far" />
          </div>
          <div className="planets">
            <div className="planet planet-1">
              <div className="planet-ring" />
              <div className="planet-crater" />
            </div>
            <div className="planet planet-2">
              <div className="planet-atmosphere" />
            </div>
          </div>
          <div className="meteors">
            <div className="meteor meteor-1" />
            <div className="meteor meteor-2" />
            <div className="meteor meteor-3" />
          </div>
          <div className="orbit-paths">
            <div className="orbit-path path-1" />
            <div className="orbit-path path-2" />
            <div className="orbit-path path-3" />
          </div>
        </div>
        <div className="loading-container">
          <div className="loading-progress">
            <div className="progress-bar" />
          </div>
          <div className="loading-text">
            LOADING SPACE MISSION<span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .space-loader {
    position: relative;
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle at center,
      #1a1a2e 0%,
      #0f0f1e 50%,
      #080810 100%
    );
    border-radius: 50%;
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.6),
      inset 0 0 50px rgba(255, 255, 255, 0.05);
    overflow: hidden;
  }

  /* Astronauta - ulepszona wersja */
  .astronaut {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 70px;
    height: 90px;
    transform: translate(-50%, -50%);
    animation: float 4s ease-in-out infinite;
  }

  .astronaut-helmet {
    position: absolute;
    width: 45px;
    height: 45px;
    background: linear-gradient(145deg, #ffffff, #e6e6e6);
    border-radius: 50%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: inset -3px -3px 8px rgba(0, 0, 0, 0.2),
      2px 2px 4px rgba(255, 255, 255, 0.1);
  }

  .helmet-glass {
    position: absolute;
    width: 35px;
    height: 25px;
    background: linear-gradient(
      135deg,
      rgba(0, 255, 255, 0.2),
      rgba(0, 0, 255, 0.1)
    );
    border-radius: 50% 50% 45% 45%;
    top: 12px;
    left: 5px;
    overflow: hidden;
  }

  .helmet-inner-glass {
    position: absolute;
    inset: 2px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.4) 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.1) 100%
    );
    border-radius: inherit;
    animation: glass-shine 3s ease-in-out infinite;
  }

  .helmet-reflection {
    position: absolute;
    width: 15px;
    height: 15px;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.8),
      transparent 70%
    );
    border-radius: 50%;
    top: 2px;
    left: 2px;
    animation: reflection-move 4s ease-in-out infinite;
  }

  .antenna {
    position: absolute;
    width: 3px;
    height: 15px;
    background: #ccc;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
  }

  .antenna::after {
    content: "";
    position: absolute;
    width: 6px;
    height: 6px;
    background: #ff3333;
    border-radius: 50%;
    top: -3px;
    left: 50%;
    transform: translateX(-50%);
    animation: blink 1s ease-in-out infinite;
  }

  .astronaut-body {
    position: absolute;
    width: 45px;
    height: 55px;
    background: linear-gradient(145deg, #ffffff, #f0f0f0);
    border-radius: 25px;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: inset -4px -4px 8px rgba(0, 0, 0, 0.2),
      2px 2px 4px rgba(255, 255, 255, 0.1);
    overflow: hidden;
  }

  .suit-pattern {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 50%, rgba(0, 0, 0, 0.05) 50%),
      linear-gradient(0deg, transparent 50%, rgba(0, 0, 0, 0.05) 50%);
    background-size: 4px 4px;
  }

  /* Animacje */
  @keyframes float {
    0%,
    100% {
      transform: translate(-50%, -50%) translateY(-10px) rotate(-2deg);
    }
    50% {
      transform: translate(-50%, -50%) translateY(10px) rotate(2deg);
    }
  }

  @keyframes glass-shine {
    0%,
    100% {
      opacity: 0.3;
      transform: translateX(-100%) rotate(-45deg);
    }
    50% {
      opacity: 0.8;
      transform: translateX(100%) rotate(-45deg);
    }
  }

  @keyframes reflection-move {
    0%,
    100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(5px, 5px);
    }
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }

  /* Środowisko kosmiczne */
  .stars-container {
    position: absolute;
    inset: 0;
    perspective: 1000px;
  }

  .stars {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      1px 1px at var(--star-x, 50%) var(--star-y, 50%),
      white 100%,
      transparent
    );
    opacity: 0.8;
  }

  .stars-near {
    animation: stars-rotate 20s linear infinite;
    background-size: 200px 200px;
  }

  .stars-mid {
    animation: stars-rotate 30s linear infinite reverse;
    background-size: 150px 150px;
    opacity: 0.6;
  }

  .stars-far {
    animation: stars-rotate 40s linear infinite;
    background-size: 100px 100px;
    opacity: 0.4;
  }

  .meteors {
    position: absolute;
    inset: 0;
  }

  .meteor {
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    filter: blur(1px);
  }

  .meteor::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    width: 20px;
    height: 1px;
    background: linear-gradient(to left, white, transparent);
    transform: translateY(-50%);
  }

  .meteor-1 {
    animation: meteor-move 3s linear infinite;
    top: 20%;
    left: -20%;
  }

  .meteor-2 {
    animation: meteor-move 4s linear infinite 2s;
    top: 40%;
    left: -20%;
  }

  .meteor-3 {
    animation: meteor-move 5s linear infinite 1s;
    top: 60%;
    left: -20%;
  }

  /* Loading container */
  .loading-container {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    text-align: center;
  }

  .loading-progress {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    margin-bottom: 10px;
    overflow: hidden;
  }

  .progress-bar {
    width: 30%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.8)
    );
    border-radius: 2px;
    animation: progress 2s ease-in-out infinite;
  }

  .loading-text {
    color: rgba(255, 255, 255, 0.8);
    font-family: "Courier New", monospace;
    font-size: 14px;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }

  @keyframes progress {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(400%);
    }
  }

  @keyframes stars-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes meteor-move {
    0% {
      transform: translate(0, 0) rotate(45deg);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      transform: translate(400px, 400px) rotate(45deg);
      opacity: 0;
    }
  }
`;

export default Loader;
