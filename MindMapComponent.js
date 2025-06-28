'use client';

import React, { useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

export default function MindMapComponent() {
  const [topic, setTopic] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(false);

  const generateMindMap = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setNodes([]);
    setEdges([]);

    try {
      const res = await fetch('/api/mindmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      const subIdeas = data.ideas?.slice(0, 6) || ['Introduction', 'Concepts', 'Applications'];

      const centerNode = {
        id: '1',
        data: { label: topic },
        position: { x: 250, y: 50 },
      };

      const newNodes = [centerNode];
      const newEdges = [];

      subIdeas.forEach((idea, i) => {
        const id = (i + 2).toString();
        newNodes.push({
          id,
          data: { label: idea.replace(/^\d+\.\s*/, '') },
          position: { x: 100 + i * 130, y: 200 },
        });

        newEdges.push({
          id: `e1-${id}`,
          source: '1',
          target: id,
        });
      });

      setNodes(newNodes);
      setEdges(newEdges);
    } catch (error) {
      console.error('Mind map generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100%', padding: '2rem' }}>
      <div className="mb-4 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Enter a topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-64"
        />
        <button
          onClick={generateMindMap}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Mind Map'}
        </button>
      </div>

      <div style={{ height: '500px', border: '1px solid #ccc', borderRadius: '10px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}
