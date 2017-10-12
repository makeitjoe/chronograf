import defaultQueryConfig from 'src/utils/defaultQueryConfig'
import {
  applyFuncsToField,
  chooseMeasurement,
  chooseNamespace,
  chooseTag,
  groupByTag,
  groupByTime,
  toggleKapaField,
  toggleTagAcceptance,
} from 'src/utils/queryTransitions'

const IS_KAPACITOR_RULE = true

const queryConfigs = (state = {}, action) => {
  switch (action.type) {
    case 'KAPA_LOAD_QUERY': {
      const {query} = action.payload
      const nextState = Object.assign({}, state, {
        [query.id]: query,
      })

      return nextState
    }

    case 'KAPA_ADD_QUERY': {
      const {queryID} = action.payload

      return {
        ...state,
        [queryID]: defaultQueryConfig({id: queryID, isKapacitorRule: true}),
      }
    }

    case 'KAPA_CHOOSE_NAMESPACE': {
      const {queryId, database, retentionPolicy} = action.payload
      const nextQueryConfig = chooseNamespace(
        state[queryId],
        {
          database,
          retentionPolicy,
        },
        IS_KAPACITOR_RULE
      )

      return Object.assign({}, state, {
        [queryId]: Object.assign(nextQueryConfig, {rawText: null}),
      })
    }

    case 'KAPA_CHOOSE_MEASUREMENT': {
      const {queryId, measurement} = action.payload
      const nextQueryConfig = chooseMeasurement(
        state[queryId],
        measurement,
        IS_KAPACITOR_RULE
      )

      return Object.assign({}, state, {
        [queryId]: Object.assign(nextQueryConfig, {
          rawText: state[queryId].rawText,
        }),
      })
    }

    case 'KAPA_CHOOSE_TAG': {
      const {queryId, tag} = action.payload
      const nextQueryConfig = chooseTag(state[queryId], tag)

      return Object.assign({}, state, {
        [queryId]: nextQueryConfig,
      })
    }

    case 'KAPA_GROUP_BY_TAG': {
      const {queryId, tagKey} = action.payload
      const nextQueryConfig = groupByTag(state[queryId], tagKey)
      return Object.assign({}, state, {
        [queryId]: nextQueryConfig,
      })
    }

    case 'KAPA_TOGGLE_TAG_ACCEPTANCE': {
      const {queryId} = action.payload
      const nextQueryConfig = toggleTagAcceptance(state[queryId])

      return Object.assign({}, state, {
        [queryId]: nextQueryConfig,
      })
    }

    case 'KAPA_TOGGLE_FIELD': {
      const {queryId, fieldFunc} = action.payload
      const nextQueryConfig = toggleKapaField(state[queryId], fieldFunc)

      return {...state, [queryId]: {...nextQueryConfig, rawText: null}}
    }

    case 'KAPA_APPLY_FUNCS_TO_FIELD': {
      const {queryId, fieldFunc} = action.payload
      const nextQueryConfig = applyFuncsToField(state[queryId], fieldFunc, {
        preventAutoGroupBy: true,
        isKapacitorRule: true,
      })

      return Object.assign({}, state, {
        [queryId]: nextQueryConfig,
      })
    }

    case 'KAPA_GROUP_BY_TIME': {
      const {queryId, time} = action.payload
      const nextQueryConfig = groupByTime(state[queryId], time)

      return Object.assign({}, state, {
        [queryId]: nextQueryConfig,
      })
    }
  }
  return state
}

export default queryConfigs
