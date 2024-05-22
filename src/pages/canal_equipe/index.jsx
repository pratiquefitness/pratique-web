import Loading from '@/components/Loading'
import { getCis } from '@/redux/actions/cis'
import { getPonto, setPonto } from '@/redux/actions/ponto'
import { Button, Card, Space, Table, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { LuMegaphone } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'

const ButtonCI = (
  <Button type="primary" shape="round" size="small" block>
    Ir para C.I
  </Button>
)

export default function CanalEquipe() {
  const disptach = useDispatch();
  const { data: dataCis, loading: loadingCis } = useSelector(state => state.cis);
  const { data: ponto, loading: loadingPonto } = useSelector(state => state.ponto);
  const { usuario } = useSelector(state => state.login);

  const insertPonto = () => {
    disptach(setPonto())
  }

  const refreshCI = () => {
    disptach(getCis())
  }

  useEffect(() => {
    disptach(getPonto());
    disptach(getCis());
  }, []);

  /*const checkIfInside = (spotCoordinates) => {

    const distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
      let earthRadiusKm = 6371;
      let dLat = degreesToRadians(lat2 - lat1);
      let dLon = degreesToRadians(lon2 - lon1);

      lat1 = degreesToRadians(lat1);
      lat2 = degreesToRadians(lat2);

      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) *
        Math.cos(lat1) * Math.cos(lat2);

      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return earthRadiusKm * c;
    }

    const degreesToRadians = (degrees) => {
      return degrees * Math.PI / 180;
    }

    let center = { lat: coordenadaUnidade.latitude, lng: coordenadaUnidade.longitude};
    let radius = 0.5;
    let newRadius = distanceInKmBetweenEarthCoordinates(spotCoordinates[0], spotCoordinates[1], center.lat, center.lng);

    if (newRadius < radius) {
      //point is inside the circle
      setOutsideRadius(prevState => ({
        isOutside: false
      }));
    } else if (newRadius > radius) {
      //point is outside the circle
      setOutsideRadius(prevState => ({
        isOutside: true
      }));
    } else {
      //point is on the circle
      setOutsideRadius(prevState => ({
        isOutside: false
      }));
    }
  }*/

  /*const _onGetCurrentLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      //use coordinates
      const marker = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      setLocation(prevState => ({
        ...prevState,
        ...marker
      }))
    }, function (error) {
      //error handler here
    }, options)
  }*/

  /*const geolocation = () => {
    if (navigator.permissions && navigator.permissions.query) {
      //try permissions APIs first
      navigator.permissions.query({name: 'geolocation'}).then(function (result) {
        // Will return ['granted', 'prompt', 'denied']
        const permission = result.state;
        if (permission === 'granted' || permission === 'prompt') {
          _onGetCurrentLocation();
        }
      })
    } else if (navigator.geolocation) {
      //then Navigation APIs
      _onGetCurrentLocation();
    }
  }

  useEffect(() => {
    geolocation();
  }, []);*/

  /*useEffect(() => {
    let spotCoordinates1 = [location.lat, location.lng];
    checkIfInside(spotCoordinates1);
  }, [location, coordenadaUnidade]);

  setInterval(() => { geolocation() }, 5000);*/

  return (
    <Loading spinning={loadingCis}>
      <Space direction="vertical" size={16} className="w-100">
        {dataCis.disponiveis.length ? (
          dataCis.disponiveis.map(ci => (
            <Card
              title={ci.post_title}
              extra={
                <a
                  href={`https://pratiqueemcasa.com.br/pratique-em-casa/powergym/verifica.php?email=${usuario.user_email}&nome=teste&url=https://www.metodologiapowergym.com.br/novo/courses/${ci.post_name}`}
                  target="_blank"
                >
                  {ButtonCI}
                </a>
              }
            >
              <p>{ci.post_excerpt ? ci.post_excerpt : 'Sem descrição'}</p>
            </Card>
          ))
        ) : (
          <div className="text-center p-4">
            <Typography.Title level={5}>Nenhuma C.I</Typography.Title>
          </div>
        )}
        {!!dataCis.disponiveis.length && (
          <Button type="primary" onClick={refreshCI} loading={loadingCis} block>
            Atualizar
          </Button>
        )}

        <Button
          type="primary"
          style={ponto.length ? { background: '#b7eb8f' } : {}}
          disabled={!!dataCis.disponiveis.length || ponto.length}
          onClick={insertPonto}
          loading={loadingPonto}
          block
        >
          {ponto.length ? 'Ponto Registrado' : 'Ponto Digital'}
        </Button>

        <a href="https://grupopratique.typeform.com/to/WZUsTlXl" target="_blank">
          <Button icon={<LuMegaphone />} block>
            Fale com o Papai
          </Button>
        </a>
        <Typography.Title level={3}>C.Is Anteriores</Typography.Title>
        <Table
          dataSource={dataCis.anteriores}
          loading={loadingCis}
          columns={[
            {
              title: 'Nome',
              dataIndex: 'post_title',
              key: 'post_title'
            },
            {
              title: '',
              dataIndex: 'post_title',
              key: 'ci',
              render: (_, record) => (
                <a
                  href={`https://pratiqueemcasa.com.br/pratique-em-casa/powergym/verifica.php?email=${usuario.user_email}&nome=teste&url=https://www.metodologiapowergym.com.br/novo/courses/${record.post_name}`}
                  target="_blank"
                >
                  <Button shape="round" size="small" block>
                    Ir para C.I
                  </Button>
                </a>
              )
            }
          ]}
        />
      </Space>
    </Loading>
  )
}