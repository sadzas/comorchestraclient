import * as React from 'react';
import { useState, useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import LibraryAddTwoToneIcon from '@mui/icons-material/LibraryAddTwoTone';
import DraftsIcon from '@mui/icons-material/Drafts';
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import TocTwoToneIcon from '@mui/icons-material/TocTwoTone';
import MonitorTwoToneIcon from '@mui/icons-material/MonitorTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import StackedLineChartTwoToneIcon from '@mui/icons-material/StackedLineChartTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import ViewQuiltTwoToneIcon from '@mui/icons-material/ViewQuiltTwoTone';
import CalendarViewWeekTwoToneIcon from '@mui/icons-material/CalendarViewWeekTwoTone';
import WorkspacesTwoToneIcon from '@mui/icons-material/WorkspacesTwoTone';
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import DashboardCustomizeTwoToneIcon from '@mui/icons-material/DashboardCustomizeTwoTone';
import LegendToggleTwoToneIcon from '@mui/icons-material/LegendToggleTwoTone';
import FilterNoneTwoToneIcon from '@mui/icons-material/FilterNoneTwoTone';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useSelector } from 'react-redux';
import { usuarioPerfil, usuarioPermisosOperacion, usuarioPermisosSupervision, usuarioPermisosAdministracion } from '../redux/selectors';
import { Link } from "react-router-dom";

/**
 * 1	Reportes Generales
 * 2	Reportes Operadores
 * 3	Operadores
 * 4	Colas
 * 5	Habilidades
 * 6	Estados
 * 7	Grupos
 * 8	Panel Operador
 * 9	Panel Monitoria
 * 10	Grabaciones
 */
export default function MainListItems() {

  const usuario_perfil = useSelector(usuarioPerfil)
  const usuario_permisos_operacion = useSelector(usuarioPermisosOperacion)
  const usuario_permisos_supervision = useSelector(usuarioPermisosSupervision)
  const usuario_permisos_administracion = useSelector(usuarioPermisosAdministracion)

  const [usuariosAdmin, setUsuariosAdmin] = useState(false);
  const [colasAdmin, setColasAdmin] = useState(false);

  const [sectores, setSectores] = useState(false);
  const [departamentos, setDepartamentos] = useState(false);
  const [gerencias, setGerencias] = useState(false);
  const [usuarios, setUsuarios] = useState(false);
  const [colas, setColas] = useState(false);
  const [habilidades, setHabilidades] = useState(false);
  const [estados, setEstados] = useState(false);
  const [grupos, setGrupos] = useState(false);
  const [paneloperador, setPaneloperador] = useState(false);
  const [panelmonitoria, setPanelmonitoria] = useState(false);

  const hcGerencias = () => {
    setGerencias(!gerencias);
  };

  const hcDepartamentos = () => {
    setDepartamentos(!departamentos);
  };

  const hcSectores = () => {
    setSectores(!sectores);
  }

  const hcUsuariosAdmin = () => {
    setUsuariosAdmin(!usuariosAdmin);
  };

  const hcColasAdmin = () => {
    setColasAdmin(!colasAdmin);
  };

  const hcUsuarios = () => {
    setUsuarios(!usuarios);
  };

  const hcColas = () => {
    setColas(!colas);
  };

  const hcHabilidades = () => {
    setHabilidades(!habilidades);
  };

  const hcEstados = () => {
    setEstados(!estados);
  };

  const hcGrupos = () => {
    setGrupos(!grupos);
  };

  const hcPanelOperador = () => {
    setPaneloperador(!paneloperador);
  };

  const hcPanelMonitoria = () => {
    setPanelmonitoria(!panelmonitoria);
  };

  let sxAdministracion = {}
  let sxSupervision = {}
  let sxOperacion = {}
  let sxUsuarios = { xs: 'none' }
  let sxColas = { xs: 'none' }
  let sxHabilidades = { xs: 'none' }
  let sxEstados = { xs: 'none' }
  let sxGrupos = { xs: 'none' }

  /**
   * Armado del menu de acuerdo al perfil:
   * ID 1: Es administrador. No debe acceder a la supervision ni operacion.
   * ID 2: Es Supervisor. No debe acceder a la administracion.
   * ID 3: Es Operdor. No debe acceder ni Administracion ni Supervision.
   * 
   * Se entiende que el administrador no tendrá limitación del menu propio. De todos modos, se deja preparado el ambiente
   * por si en el futuro se desea limitar las opciones de alguna forma.
   * Se entiende que el supervisor tendrá las opciones limitadas de acuerdo a los permisos estipulados por el inmediato superior.
   */
  switch (usuario_perfil) {
    case 1:
      sxSupervision = {
        xs: 'none'
      }
      sxOperacion = {
        xs: 'none'
      }
      break;
    case 2:
      sxAdministracion = {
        xs: 'none'
      }
      break;
    case 3:
      sxAdministracion = {
        xs: 'none'
      }
      sxSupervision = {
        xs: 'none'
      }
      break;
  }

  if (usuario_permisos_supervision.includes(3)) {
    sxUsuarios = {
      xs: ''
    }
  }

  if (usuario_permisos_supervision.includes(4)) {
    sxColas = {
      xs: ''
    }
  }

  if (usuario_permisos_supervision.includes(5)) {
    sxHabilidades = {
      xs: ''
    }
  }

  if (usuario_permisos_supervision.includes(6)) {
    sxEstados = {
      xs: ''
    }
  }

  if (usuario_permisos_supervision.includes(7)) {
    sxGrupos = {
      xs: ''
    }
  }

  return (
    <div>
      <ListItem sx={{ display: sxOperacion }} button component={Link} to="/panelusuario">
        <ListItemIcon>
          <AccountCircleTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary="Panel de Operador" />
      </ListItem>
      <Box sx={{ display: sxSupervision }}>
        <ListItem sx={{ display: sxSupervision }} button component={Link} to="/panelmonitoria">
          <ListItemIcon>
            <MonitorTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Panel de Monitoria" />
        </ListItem>
      </Box>

      < Divider />

      {/*
        Sector para la Administracion
      */}
      <ListSubheader inset>Administración</ListSubheader>
      <Box sx={{ display: sxAdministracion }}>
        <ListItemButton onClick={hcUsuariosAdmin} >
          <ListItemIcon>
            <GroupTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
          {usuariosAdmin ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={usuariosAdmin} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/usuario_agregar" >
              <ListItemIcon>
                <GroupAddTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Agregar" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/usuario_editar">
              <ListItemIcon>
                <EditTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Editar" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={hcColasAdmin}>
          <ListItemIcon>
            <TableRowsTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Colas" />
          {colasAdmin ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={colasAdmin} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/cola_agregar">
              <ListItemIcon>
                <LibraryAddTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Agregar" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/cola_editar">
              <ListItemIcon>
                <EditTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Editar" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={hcSectores}>
          <ListItemIcon>
            <GridViewTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Sectores" />
          {sectores ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={sectores} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/sector_agregar">
              <ListItemIcon>
                <DashboardCustomizeTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Agregar" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/sector_editar">
              <ListItemIcon>
                <EditTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Editar" />
            </ListItemButton>
          </List>
        </Collapse>
        {/*
        <ListItemButton onClick={hcDepartamentos}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Departamentos" />
          {departamentos ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={departamentos} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/departamentos_agregar">
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Agregar" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/departamentos_modificar">
              <ListItemIcon>
                <EditTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Modificar" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={hcGerencias}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Gerencias" />
          {gerencias ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={gerencias} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/gerencias_agregar">
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Agregar" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/gerencias_modificar">
              <ListItemIcon>
                <EditTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Modificar" />
            </ListItemButton>
          </List>
        </Collapse>
        */}
      </Box>
      < Divider />

      {/*
        Sector para la Supervision
      */}
      <ListSubheader inset>Supervisión</ListSubheader>
      <Box sx={{ display: sxSupervision }}>
        <ListItemButton sx={{ display: sxUsuarios }} onClick={hcUsuarios}>
          <ListItemIcon>
            <GroupTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
          {usuarios ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse sx={{ display: sxUsuarios }} in={usuarios} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/usuario_permisos">
              <ListItemIcon>
                <ViewQuiltTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Permisos" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/usuario_habilidades">
              <ListItemIcon>
                <StackedLineChartTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Habilidades" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/usuario_estados">
              <ListItemIcon>
                <CalendarViewWeekTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Estados" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton sx={{ display: sxColas }} onClick={hcColas}>
          <ListItemIcon>
            <TableRowsTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Colas" />
          {colas ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse sx={{ display: sxColas }} in={colas} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/cola_propiedades">
              <ListItemIcon>
                <TocTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Propiedades" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/cola_habilidades">
              <ListItemIcon>
                <StackedLineChartTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Habilidades" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton sx={{ display: sxHabilidades }} onClick={hcHabilidades}>
          <ListItemIcon>
            <StackedLineChartTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Habilidades" />
          {habilidades ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse sx={{ display: sxHabilidades }} in={habilidades} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

            <ListItemButton sx={{ pl: 4 }} component={Link} to="/habilidad_agregar">
              <ListItemIcon>
                <AddCircleTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Agregar" />
            </ListItemButton>
            
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/habilidad_asignar">
              <ListItemIcon>
                <LegendToggleTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Asignar" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }} component={Link} to="/habilidad_agrupar">
              <ListItemIcon>
                <WorkspacesTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Agrupar" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton sx={{ display: sxEstados }} onClick={hcEstados}>
          <ListItemIcon>
            <CalendarViewWeekTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Estados" />
          {estados ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse sx={{ display: sxEstados }} in={estados} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/estado_agregar">
              <ListItemIcon>
                <AddCircleTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Agregar" />
            </ListItemButton>
            
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/estado_asignar">
              <ListItemIcon>
                <FilterNoneTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Asignar" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }} component={Link} to="/estado_agrupar">
              <ListItemIcon>
                <ListAltTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Agrupar" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton sx={{ display: sxGrupos }} onClick={hcGrupos}>
          <ListItemIcon>
            <WorkspacesTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Grupos" />
          {grupos ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse sx={{ display: sxGrupos }} in={grupos} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/grupo_habilidades">
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Habilidades" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/grupo_estados">
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Estados" />
            </ListItemButton>
          </List>
        </Collapse>

        < Divider />
        <ListSubheader inset>Reportes</ListSubheader>

        <ListItem sx={{ display: sxSupervision }} button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Reportes Generales" />
        </ListItem>
        <ListItem sx={{ display: sxSupervision }} button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Reportes Operadores" />
        </ListItem>
        <ListItem sx={{ display: sxSupervision }} button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Graficas" />
        </ListItem>
      </Box>
    </div>
  )
};