import FoodList from "../../components/FoodList/FoodList.component";
import { ReactElement } from "react";
import { canEdit, isAdmin } from "../../services/user.service";
import { useAuth } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import { useFoodEntries } from "../../context/food.context";
import {
  filterFoodByPeriod,
  getDateOfDaysAgo,
  getDateRangeArray,
  groupFoodByUser,
  resetHours,
  weekday,
} from "../../utils/utils";
import { Card, Col, Descriptions, Form, List, Row, Statistic } from "antd";
import Title from "antd/lib/typography/Title";
import classNames from "classnames";
import "./Reports.styles.scss";
import CaloriesChart from "../../components/CaloriesChart/CaloriesChart.component";

export default function ReportsPage(): ReactElement {
  const { user } = useAuth();
  const { allFoodEntries } = useFoodEntries();

  if (!user && !isAdmin(user)) {
    return <Navigate to="/" replace />;
  }

  const lastWeekFoodEntries = filterFoodByPeriod(
    allFoodEntries,
    getDateOfDaysAgo(7),
    new Date()
  );
  const weekBeforeFoodEntries = filterFoodByPeriod(
    allFoodEntries,
    getDateOfDaysAgo(14),
    getDateOfDaysAgo(7)
  );

  const lastWeekFoodEntriesGroupedByUser = groupFoodByUser(lastWeekFoodEntries);
  console.log(lastWeekFoodEntriesGroupedByUser);
  const dates = getDateRangeArray(getDateOfDaysAgo(7), new Date());
  console.log(dates);

  const usersCaloriesMedian = Object.keys(lastWeekFoodEntriesGroupedByUser).map(
    (key) => {
      const userFoodEntries = lastWeekFoodEntriesGroupedByUser[key];

      const sums = dates.map((date) => {
        const entries = userFoodEntries.filter(
          (entry) =>
            resetHours(entry?.datetime?.toDate()).getTime() === date.getTime()
        );
        const sum = entries.reduce(
          (accumulator, element) => accumulator + element.calorie_value,
          0
        );
        // const median =
        //   entries.reduce(
        //     (accumulator, element) => accumulator + element.calorie_value,
        //     0
        //   ) / entries.length;
        return {
          date: date,
          entries: entries,
          sum: sum,
        };
      });

      return {
        uid: userFoodEntries[0].uid,
        user_email: userFoodEntries[0].user_email,
        sums: sums,
        median:
          sums.reduce((accumulator, element) => accumulator + element.sum, 0) /
          sums.length,
      };
    }
  );
  console.log(usersCaloriesMedian);

  return (
    <div className="reports-page">
      <div className="reports-page__card-wrapper">
        <Title level={3}>Weekly Report</Title>
        <Card>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="Total of entries in the past week"
                value={lastWeekFoodEntries.length ?? 0}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Total of entries in the week before"
                value={weekBeforeFoodEntries.length ?? 0}
              />
            </Col>
          </Row>
        </Card>
      </div>
      <div className="reports-page__users-wrapper">
        <Title level={3}>Median Calories Per User</Title>
        <List
          itemLayout="horizontal"
          dataSource={usersCaloriesMedian}
          pagination={{ defaultCurrent: 1, pageSize: 1 }}
          renderItem={(item) => (
            <Card
              className="reports-page__users-wrapper__card"
              title={`${item.user_email}`}
            >
              <Row gutter={16}>
                <Col
                  className="reports-page__users-wrapper__card__summary"
                  span={24}
                >
                  <Title
                    className="reports-page__users-wrapper__title"
                    level={4}
                  >
                    Median Calories of the week:{" "}
                  </Title>
                  <Title level={3}>{item.median} kcal</Title>
                </Col>
              </Row>
              <Title className="reports-page__users-wrapper__title" level={4}>
                Total calories per day
              </Title>
              <Row gutter={16}>
                {item.sums.map((elem) => (
                  <Col
                    span={5}
                    className="reports-page__users-wrapper__daily-report"
                  >
                    <Statistic
                      title={`${weekday[elem?.date?.getDay()]}, ${
                        elem?.date?.toLocaleString()?.split(",")[0]
                      }`}
                      value={`${elem?.sum ?? 0} kcal`}
                    />
                  </Col>
                ))}
              </Row>
              <br />
              <CaloriesChart foodEntries={item.sums} />
            </Card>
          )}
        />
      </div>
    </div>
  );
}
