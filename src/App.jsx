import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import Navbar from './components/layout/Navbar';
import Landing from './pages/Landing';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import Proof from './pages/Proof';
import Step01Problem from './pages/rb/Step01Problem';
import Step02Market from './pages/rb/Step02Market';
import Step03Architecture from './pages/rb/Step03Architecture';
import Step04HLD from './pages/rb/Step04HLD';
import Step05LLD from './pages/rb/Step05LLD';
import Step06Build from './pages/rb/Step06Build';
import Step07Test from './pages/rb/Step07Test';
import Step08Ship from './pages/rb/Step08Ship';
import RbProof from './pages/rb/Proof';

function App() {
  return (
    <ResumeProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing — no navbar */}
          <Route path="/" element={<Landing />} />

          {/* App routes — with navbar */}
          <Route path="/builder" element={<><Navbar /><Builder /></>} />
          <Route path="/preview" element={<><Navbar /><Preview /></>} />
          <Route path="/proof" element={<><Navbar /><Proof /></>} />

          {/* Build process tracking routes */}
          <Route path="/rb/01-problem" element={<Step01Problem />} />
          <Route path="/rb/02-market" element={<Step02Market />} />
          <Route path="/rb/03-architecture" element={<Step03Architecture />} />
          <Route path="/rb/04-hld" element={<Step04HLD />} />
          <Route path="/rb/05-lld" element={<Step05LLD />} />
          <Route path="/rb/06-build" element={<Step06Build />} />
          <Route path="/rb/07-test" element={<Step07Test />} />
          <Route path="/rb/08-ship" element={<Step08Ship />} />
          <Route path="/rb/proof" element={<RbProof />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ResumeProvider>
  );
}

export default App;
