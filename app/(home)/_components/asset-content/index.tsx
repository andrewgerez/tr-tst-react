import React from 'react'
import StatusIndicator from '@/tokens/status-indicator'
import Divider from '@/tokens/divider'
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
  return (
    <ResponsiveContainer>
      <ContentHeader>
        <h4>MOTOR RT COAL AF01</h4>
        <StatusIndicator status={SensorStatus.OPERATING} />
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
                <h6>Motor Elétrico (Trifásico)</h6>
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
              <h6>HIO4510</h6>
            </span>
          </Information>

          <Information>
            <h5>Receptor</h5>
            <span>
              <RouterIcon />
              <h6>EUH4R27</h6>
            </span>
          </Information>
        </AdditionalInformation>
      </ContentInformation>
    </ResponsiveContainer>
  )
}

export default AssetContent
