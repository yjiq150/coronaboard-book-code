import React from 'react';
import { GlobalTable } from './global-table';
import { Slide } from './slide';
import { GlobalGeoChart } from './global-geo-chart';

export function GlobalSlide(props) {
  const { id, dataSource } = props;
  const { countryByCc, globalStats } = dataSource;
  return (
    <Slide id={id} title="국가별 현황">
      <GlobalGeoChart countryByCc={countryByCc} globalStats={globalStats} />
      <GlobalTable countryByCc={countryByCc} globalStats={globalStats} />
    </Slide>
  );
}
