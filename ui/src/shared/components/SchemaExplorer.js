import React, {PropTypes} from 'react'

import DatabaseList from 'src/shared/components/DatabaseList'
import MeasurementList from 'src/shared/components/MeasurementList'
import FieldList from 'src/shared/components/FieldList'

const actionBinder = (id, action) => item => action(id, item)

const SchemaExplorer = ({
  query,
  query: {id},
  source,
  actions: {
    chooseTag,
    groupByTag,
    groupByTime,
    fill,
    chooseNamespace,
    chooseMeasurement,
    applyFuncsToField,
    toggleTagAcceptance,
    toggleFieldWithGroupByInterval,
  },
}) =>
  <div className="query-builder">
    <DatabaseList
      query={query}
      querySource={source}
      onChooseNamespace={actionBinder(id, chooseNamespace)}
    />
    <MeasurementList
      source={source}
      query={query}
      querySource={source}
      onChooseTag={actionBinder(id, chooseTag)}
      onGroupByTag={actionBinder(id, groupByTag)}
      onChooseMeasurement={actionBinder(id, chooseMeasurement)}
      onToggleTagAcceptance={actionBinder(id, toggleTagAcceptance)}
    />
    <FieldList
      source={source}
      query={query}
      querySource={source}
      onToggleField={actionBinder(id, toggleFieldWithGroupByInterval)}
      onFill={actionBinder(id, fill)}
      onGroupByTime={actionBinder(id, groupByTime)}
      applyFuncsToField={actionBinder(id, applyFuncsToField)}
    />
  </div>

const {func, shape, string} = PropTypes

SchemaExplorer.propTypes = {
  query: shape({
    id: string,
  }).isRequired,
  actions: shape({
    chooseNamespace: func.isRequired,
    chooseMeasurement: func.isRequired,
    applyFuncsToField: func.isRequired,
    chooseTag: func.isRequired,
    groupByTag: func.isRequired,
    toggleField: func.isRequired,
    groupByTime: func.isRequired,
    toggleTagAcceptance: func.isRequired,
    fill: func.isRequired,
    editRawTextAsync: func.isRequired,
  }).isRequired,
  source: shape({}),
}

export default SchemaExplorer
