import s from "./Stats.module.scss";

export const Stats = ({ users, messages }) => {
  return (
    <div className={s.container}>
      <div className={s.statContainer}>
        <p className={s.value}>{users}</p>
        <p className={s.label}>Total Users</p>
      </div>
      <div className={s.statContainer}>
        <p className={s.value}>{messages}</p>
        <p className={s.label}>Total Messages</p>
      </div>
    </div>
  );
};
