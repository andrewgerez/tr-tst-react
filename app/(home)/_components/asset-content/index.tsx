import React from 'react'
import StatusIndicator from '@/tokens/status-indicator'
import Divider from '@/tokens/divider'
import useDashboardStore from '@/store/dashboard'
import { SensorStatus } from '@/enums/business'
import { EngineAsset, RouterIcon, SensorIcon } from '@/assets'
import {
  AdditionalInformation,
  ContentHeader,
  ContentInformation,
  ImageWrapper,
  Information,
  InformationWrapper,
  ResponsiveContainer,
  ResponsivePrincipalContent
} from './styles'

function AssetContent() {
  const { currentAssetActive } = useDashboardStore()

  if (!currentAssetActive) return null

  return (
    <ResponsiveContainer>
      <ContentHeader>
        <h4>{currentAssetActive?.name}</h4>
        <StatusIndicator status={currentAssetActive?.status} />
      </ContentHeader>

      <Divider />

      <ContentInformation>
        <ResponsivePrincipalContent>
          <ImageWrapper>
            <EngineAsset />
          </ImageWrapper>

          <InformationWrapper>
            <Information>
              <h5>Tipo de Equipamento</h5>
              <h6>Motor Elétrico (Trifásico)</h6>
            </Information>

            <Divider />

            <Information>
              <h5>Responsáveis</h5>
              <span>
                <h6>Elétrica</h6>
              </span>
            </Information>
          </InformationWrapper>
        </ResponsivePrincipalContent>

        <Divider />

        <AdditionalInformation>
          <Information>
            <h5>Sensor</h5>
            <span>
              <SensorIcon  />
              <h6>{currentAssetActive.sensorId}</h6>
            </span>
          </Information>

          <Information>
            <h5>Receptor</h5>
            <span>
              <RouterIcon />
              <h6>{currentAssetActive.gatewayId}</h6>
            </span>
          </Information>
        </AdditionalInformation>
      </ContentInformation>
    </ResponsiveContainer>
  )
}

export default AssetContent
