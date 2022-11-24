import React, { useEffect, useState, useCallback } from "react";
import TrainingUnitService from "../../services/trainingUnitService";
import TrainingUnitsOrgCard from "../trainingunits/TrainingUnitsOrgCard";
import { Row, Tab } from "react-bootstrap";
import debug from "sabio-debug";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";
const _logger = debug.extend("TrainingUnitsOrgList");

function TrainingUnitsOrgList() {
  const [pageData, setPageData] = useState({
    arrayOfTrainingUntisByOrg: [],
    TrainingUnitComponents: [],
    pageIndex: 0,
    pageSize: 4,
    totalCount: 0,
  });

  const mapUnitsByOrg = (aTrainingUnit) => {
    _logger(aTrainingUnit, "mappingtrainingUnit");
    return (
      <TrainingUnitsOrgCard
        trainingUnitData={aTrainingUnit}
        key={"list-A" + aTrainingUnit.id}
        onEditTrainigUnitsOrgClicked={onEditTrainigUnitsOrgClicked}
        onViewDetailsClicked={onViewDetailsClicked}
      />
    );
  };

  useEffect(() => {
    _logger("useEffect");

    const query = 2;
    const id = 27;

    TrainingUnitService.getTrainingUnitByOrgId(
      id,
      pageData.pageIndex,
      pageData.pageSize,
      query
    )
      .then(onGetTrainingUnitsSuccess)
      .catch(onGetTrainingUnitserror);
  }, [pageData.pageIndex]);

  const onGetTrainingUnitsSuccess = (data) => {
    let arrayOfTrainingUnit = data.item.pagedItems;

    _logger("TrainingUnit Success is working", data);

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfTrainingUntisByOrg = arrayOfTrainingUnit;
      pd.TrainingUnitComponents = arrayOfTrainingUnit.map(mapUnitsByOrg);
      pd.pageIndex = data.item.pageIndex;
      pd.pageSize = data.item.pageSize;
      pd.totalCount = data.item.totalCount;

      return pd;
    });
  };
  const onGetTrainingUnitserror = (error) => {
    _logger(error);
  };

  const onEditTrainigUnitsOrgClicked = useCallback((myOrg, eObj) => {
    _logger(myOrg.id, { myOrg, eObj });
  }, []);

  const onViewDetailsClicked = useCallback((myView, eObj) => {
    _logger(myView.id, { myView, eObj });
  }, []);

  const onPageChange = (page) => {
    _logger("Page", page);

    setPageData((prevState) => {
      let pd = { ...prevState };
      pd.pageIndex = page - 1;

      return pd;
    });
  };

  return (
    <Tab.Container defaultActiveKey="grid">
      <Row>{pageData.arrayOfTrainingUntisByOrg.map(mapUnitsByOrg)}</Row>
      <Pagination
        style={{ margin: "auto" }}
        locale={locale}
        current={pageData.pageIndex + 1}
        onChange={onPageChange}
        pageSize={pageData.pageSize}
        total={pageData.totalCount}
      />
    </Tab.Container>
  );
}
export default TrainingUnitsOrgList;
