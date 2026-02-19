"use client"

import { ColumnDef } from "@tanstack/react-table"
import { SoftwareTool } from "@/types/software"
import { FeatureStatusCell } from "./feature-status-cell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ExternalLink, Github } from "lucide-react"
import Link from "next/link"

export const columns: ColumnDef<SoftwareTool>[] = [
  {
    header: "Software",
    columns: [
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const website = row.original.website
          return (
            <div className="font-medium">
              <Link href={website} target="_blank" className="hover:underline flex items-center gap-1">
                {row.getValue("name")} <ExternalLink className="h-3 w-3 opacity-50" />
              </Link>
            </div>
          )
        },
      },
      {
        accessorKey: "license",
        header: "License",
        cell: ({ row }) => {
          const license = row.getValue("license") as string
          const isOss = row.original.openSource
          return (
            <Badge variant={isOss ? "default" : "secondary"}>
              {license}
            </Badge>
          )
        },
      },
      {
        accessorKey: "githubStats.forks",
        header: "Forks",
        cell: ({ row }) => {
          const forks = row.original.githubStats?.forks
          if (forks === undefined) return <span className="text-muted-foreground">-</span>
          return <span>{forks.toLocaleString()}</span>
        },
      },
      {
        accessorKey: "githubStats.lastCommit",
        header: "Last Commit",
        cell: ({ row }) => {
          const lastCommit = row.original.githubStats?.lastCommit
          if (!lastCommit) return <span className="text-muted-foreground">-</span>
          return <span className="whitespace-nowrap">{lastCommit}</span>
        },
      },
    ],
  },
  {
    header: "GitHub Stats",
    columns: [
      {
        accessorKey: "githubStats.stars",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Stars
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        cell: ({ row }) => {
          const stars = row.original.githubStats?.stars
          if (stars === undefined) return <span className="text-muted-foreground">-</span>
          return (
            <div className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              <span>{stars.toLocaleString()}</span>
            </div>
          )
        },
      },
    ],
  },
  {
    header: "Platforms",
    columns: [
      {
        accessorKey: "platforms.web",
        header: "Web",
        cell: ({ row }) => <FeatureStatusCell status={row.original.platforms.web} />,
      },
      {
        accessorKey: "platforms.android",
        header: "Android",
        cell: ({ row }) => <FeatureStatusCell status={row.original.platforms.android} />,
      },
      {
        accessorKey: "platforms.ios",
        header: "iOS",
        cell: ({ row }) => <FeatureStatusCell status={row.original.platforms.ios} />,
      },
      {
        accessorKey: "platforms.androidTv",
        header: "Android TV",
        cell: ({ row }) => <FeatureStatusCell status={row.original.platforms.androidTv} />,
      },
      {
        accessorKey: "platforms.appleTv",
        header: "Apple TV",
        cell: ({ row }) => <FeatureStatusCell status={row.original.platforms.appleTv} />,
      },
      {
        accessorKey: "platforms.windows",
        header: "Windows",
        cell: ({ row }) => <FeatureStatusCell status={row.original.platforms.windows} />,
      },
      {
        accessorKey: "platforms.mac",
        header: "Mac",
        cell: ({ row }) => <FeatureStatusCell status={row.original.platforms.mac} />,
      },
      {
        accessorKey: "platforms.linux",
        header: "Linux",
        cell: ({ row }) => <FeatureStatusCell status={row.original.platforms.linux} />,
      },
    ],
  },
  {
    header: "Codecs",
    columns: [
      {
        accessorKey: "codecs.h264",
        header: "H.264",
        cell: ({ row }) => <FeatureStatusCell status={row.original.codecs.h264} />,
      },
      {
        accessorKey: "codecs.h265",
        header: "H.265",
        cell: ({ row }) => <FeatureStatusCell status={row.original.codecs.h265} />,
      },
      {
        accessorKey: "codecs.av1",
        header: "AV1",
        cell: ({ row }) => <FeatureStatusCell status={row.original.codecs.av1} />,
      },
    ],
  },
  {
    header: "Features",
    columns: [
      {
        accessorKey: "features.hardwareTranscoding",
        header: "HW Transcode",
        cell: ({ row }) => <FeatureStatusCell status={row.original.features.hardwareTranscoding} />,
      },
      {
        accessorKey: "features.offlineDownloads",
        header: "Downloads",
        cell: ({ row }) => <FeatureStatusCell status={row.original.features.offlineDownloads} />,
      },
       {
        accessorKey: "features.liveTv",
        header: "Live TV",
        cell: ({ row }) => <FeatureStatusCell status={row.original.features.liveTv} />,
      },
      {
        accessorKey: "features.twoFactor",
        header: "2FA",
        cell: ({ row }) => <FeatureStatusCell status={row.original.features.twoFactor} />,
      },
      {
        accessorKey: "features.sso",
        header: "SSO",
        cell: ({ row }) => <FeatureStatusCell status={row.original.features.sso} />,
      },
    ],
  },
  {
    header: "Auth",
    columns: [
      {
        accessorKey: "features.ldap",
        header: "LDAP",
        cell: ({ row }) => <FeatureStatusCell status={row.original.features.ldap} />,
      },
      {
        accessorKey: "features.oidc",
        header: "OIDC",
        cell: ({ row }) => <FeatureStatusCell status={row.original.features.oidc} />,
      },
    ],
  },
  {
    header: "Integrations",
    columns: [
      {
        accessorKey: "features.sonarr",
        header: "Sonarr",
        cell: ({ row }) => <FeatureStatusCell status={row.original.features.sonarr} />,
      },
      {
        accessorKey: "features.radarr",
        header: "Radarr",
        cell: ({ row }) => <FeatureStatusCell status={row.original.features.radarr} />,
      },
      {
        accessorKey: "features.jellyseerr_overseerr",
        header: "Jellyseerr/Overseerr",
        cell: ({ row }) => <FeatureStatusCell status={row.original.features.jellyseerr_overseerr} />,
      },
    ],
  },
]
