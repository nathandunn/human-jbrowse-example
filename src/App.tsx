import React from 'react';
import './App.css';
import {createViewState, JBrowseLinearGenomeView} from "@jbrowse/react-linear-genome-view";

const assembly = {
    name: 'GRCh38',
    sequence: {
        type: 'ReferenceSequenceTrack',
        trackId: 'GRCh38-ReferenceSequenceTrack',
        adapter: {
            type: 'BgzipFastaAdapter',
            fastaLocation: {
                uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/fasta/GRCh38.fa.gz',
                locationType: 'UriLocation',
            },
            faiLocation: {
                uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/fasta/GRCh38.fa.gz.fai',
                locationType: 'UriLocation',
            },
            gziLocation: {
                uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/fasta/GRCh38.fa.gz.gzi',
                locationType: 'UriLocation',
            },
        },
    },
    aliases: ['hg38'],
    refNameAliases: {
        adapter: {
            type: 'RefNameAliasAdapter',
            location: {
                uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/hg38_aliases.txt',
                locationType: 'UriLocation',
            },
        },
    },
}

const tracks = [
    {
        type: 'FeatureTrack',
        trackId: 'ncbi_refseq_109_hg38',
        name: 'NCBI RefSeq (GFF3Tabix)',
        assemblyNames: ['GRCh38'],
        category: ['Annotation'],
        adapter: {
            type: 'Gff3TabixAdapter',
            gffGzLocation: {
                uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/ncbi_refseq/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz',
                locationType: 'UriLocation',
            },
            index: {
                location: {
                    uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/ncbi_refseq/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz.tbi',
                    locationType: 'UriLocation',
                },
            },
        },
    },
]

const defaultSession = {
    name: 'My session',
    view: {
        id: 'linearGenomeView',
        type: 'LinearGenomeView',
        tracks: [
            {
                type: 'ReferenceSequenceTrack',
                configuration: 'GRCh38-ReferenceSequenceTrack',
                displays: [
                    {
                        type: 'LinearReferenceSequenceDisplay',
                        configuration:
                            'GRCh38-ReferenceSequenceTrack-LinearReferenceSequenceDisplay',
                    },
                ],
            },
            {
                type: 'FeatureTrack',
                configuration: 'ncbi_refseq_109_hg38',
                displays: [
                    {
                        type: 'LinearBasicDisplay',
                        configuration: 'ncbi_refseq_109_hg38-LinearBasicDisplay',
                    },
                ],
            },
        ],
    },
}

function App() {

    const state = createViewState({
        assembly,
        tracks,
        location: '10:29,838,737..29,838,819',
        defaultSession,
    })
  return (
    <div className="App">
      <header>
          <a href={"https://github.com/nathandunn/human-jbrowse-example"}>JBrowse Genome View in React on Github</a>
      </header>

        <div>
            <a href="https://jbrowse.org/code/jb2/v1.5.1/?config=test_data%2Fconfig_demo.json&session=local-u7LI7VmNQ">Fuller Demo</a>
        </div>
        <div>
            <a href={"https://github.com/GMOD/jbrowse-components/blob/HEAD/products/jbrowse-react-linear-genome-view/docs/example.md"}>Further documentation</a>
        </div>
        <div>

            <JBrowseLinearGenomeView viewState={state} />
        </div>


    </div>
  );
}

export default App;
