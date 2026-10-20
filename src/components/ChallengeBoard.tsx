import { useEffect, useState } from "react";
import type { Challenge } from "../data/content";
import { earnedXp, parseSolved, totalXp } from "../lib/xp";
import styles from "./ChallengeBoard.module.css";

const STORAGE_KEY = "raudev:solved";

interface Props {
  challenges: Challenge[];
}

export default function ChallengeBoard({ challenges }: Props) {
  const [solved, setSolved] = useState<Set<string>>(() => new Set());

  // Read progress after hydration so the server-rendered markup always matches.
  useEffect(() => {
    try {
      setSolved(parseSolved(localStorage.getItem(STORAGE_KEY), challenges));
    } catch {
      // Storage can be unavailable (private mode, blocked cookies); progress just isn't remembered.
    }
  }, [challenges]);

  function toggle(id: string) {
    setSolved((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // See above.
      }
      return next;
    });
  }

  const earned = earnedXp(challenges, solved);
  const total = totalXp(challenges);

  return (
    <div className={styles.board}>
      <div className={styles.meter}>
        <p className={styles.score} aria-live="polite">
          <span className={styles.earned}>{earned}</span> / {total} xp
        </p>
        <progress
          className={styles.track}
          aria-label="Challenge xp earned"
          value={earned}
          max={total}
        />
        <p className={styles.hint}>Progress is saved in this browser only.</p>
      </div>

      <ol className={styles.list}>
        {challenges.map((challenge) => {
          const done = solved.has(challenge.id);
          const checkboxId = `solved-${challenge.id}`;
          return (
            <li
              key={challenge.id}
              className={done ? `${styles.card} ${styles.done}` : styles.card}
            >
              <div className={styles.head}>
                <p className={styles.kind}>{challenge.kind}</p>
                <p className={styles.xp}>
                  {challenge.xp > 0 ? `+${challenge.xp} xp` : "no xp"}
                </p>
              </div>
              <h3 className={styles.title}>
                <a
                  href={challenge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {challenge.title}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </h3>
              <p className={styles.url}>
                {challenge.url.replace(/^https:\/\//, "")}
              </p>
              {challenge.note && (
                <p className={styles.note}>{challenge.note}</p>
              )}
              <div className={styles.foot}>
                <label className={styles.check} htmlFor={checkboxId}>
                  <input
                    id={checkboxId}
                    type="checkbox"
                    checked={done}
                    onChange={() => toggle(challenge.id)}
                  />
                  Solved
                </label>
                {challenge.solutionUrl && (
                  <a
                    className={styles.solution}
                    href={challenge.solutionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Reference solution
                    <span className="visually-hidden">
                      {" "}
                      (opens in a new tab)
                    </span>
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
