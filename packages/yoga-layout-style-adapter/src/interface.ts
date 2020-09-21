import {
  ALIGN_ADAPTER,
  DISPLAY_ADAPTER,
  FLEXDIRECTION_ADAPTER,
  FLEXWRAP_ADAPTER,
  JUSTIFYCONTENT_ADAPTER,
  OVERFLOW_ADAPTER,
  POSITION_ADAPTER
} from './adapter/index'

export interface CSSProperty  {
  alignContent: keyof typeof ALIGN_ADAPTER
  alignItems: keyof typeof ALIGN_ADAPTER
  alignSelf: keyof typeof ALIGN_ADAPTER
  aspectRatio: number
  borderWidth: number
  borderLeftWidth: number
  borderTopWidth: number
  borderRightWidth: number
  borderBottomWidth: number
  display: keyof typeof DISPLAY_ADAPTER
  flex: number
  flexBasis: number | string
  flexBasisPercent: number
  flexDirection: keyof typeof FLEXDIRECTION_ADAPTER
  flexGrow: number
  flexShrink: number
  flexWrap: keyof typeof FLEXWRAP_ADAPTER
  height: number | 'auto' | string
  // heightAuto: number | string
  // heightPercent: number
  justifyContent: keyof typeof JUSTIFYCONTENT_ADAPTER
  margin: number
  marginLeft: number
  marginTop: number
  marginRight: number
  marginBottom: number
  maxHeight: number | string
  // maxHeightPercent: number
  maxWidth: number | string
  // maxWidthPercent: number
  minHeight: number | string
  // minHeightPercent: number
  minWidth: number | string
  // minWidthPercent: number
  overflow: keyof typeof OVERFLOW_ADAPTER
  padding: number
  paddingLeft: number
  paddingTop: number
  paddingRight: number
  paddingBottom: number
  position: keyof typeof POSITION_ADAPTER
  width: number | 'auto' | string
}
