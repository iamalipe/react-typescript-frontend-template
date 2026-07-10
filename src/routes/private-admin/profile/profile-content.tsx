import { useEffect } from "react";
import { Key, Shield, Clock, Activity, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import dayjs from "dayjs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCurrentUser from "@/hooks/useCurrentUser";
import apiQuery from "@/hooks/use-api-query";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileContent() {
  const currentUser = useCurrentUser();
  const updateProfileMutation = apiQuery.auth.useUpdateProfile();

  // Fetch change logs
  const { data: logsData, isLoading: isLoadingLogs } = apiQuery.changelog.useGetAll({
    page: 1,
    limit: 20,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
    },
  });

  // Sync user details when they are loaded
  useEffect(() => {
    if (currentUser) {
      reset({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
      });
    }
  }, [currentUser, reset]);

  const onSubmit = (values: ProfileFormValues) => {
    updateProfileMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Profile details updated successfully");
      },
      onError: (err: any) => {
        toast.error(err?.message || "Failed to update profile details");
      },
    });
  };

  return (
    <Tabs defaultValue="personal" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3 max-w-md">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="changelog">Activity Log</TabsTrigger>
      </TabsList>

      {/* Personal Information */}
      <TabsContent value="personal" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your profile details below. Email updates are currently locked.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" {...register("firstName")} />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" {...register("lastName")} />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={currentUser?.email || ""}
                    disabled
                    className="bg-muted text-muted-foreground cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your email address is managed by the system administrator and cannot be changed.
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={!isDirty || updateProfileMutation.isPending}
                >
                  {updateProfileMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Security Settings */}
      <TabsContent value="security" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage your credentials, authentication methods, and security preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Password Authentication</Label>
                  <p className="text-muted-foreground text-sm">
                    Secure your account with a custom password string.
                  </p>
                </div>
                <Button variant="outline">
                  <Key className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Two-Factor Authentication (2FA)</Label>
                  <p className="text-muted-foreground text-sm">
                    Add a second step verification using an authenticator app.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                    Active
                  </Badge>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Login Notifications</Label>
                  <p className="text-muted-foreground text-sm">
                    Receive email alerts immediately whenever a login happens from a new browser session.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Active Login Sessions</Label>
                  <p className="text-muted-foreground text-sm">
                    Review and log out of active browser instances on other devices.
                  </p>
                </div>
                <Button variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  View Sessions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* ChangeLog Tab */}
      <TabsContent value="changelog" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>
              Review all historical operations, edits, and modifications recorded for your records.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingLogs ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : !logsData?.data || logsData.data.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <Activity className="h-10 w-10 mb-2 stroke-1" />
                <p>No activity logs found</p>
              </div>
            ) : (
              <div className="relative border-l border-muted pl-6 space-y-6">
                {logsData.data.map((log) => (
                  <div key={log._id} className="relative">
                    {/* Circle marker */}
                    <div className="absolute -left-[31px] top-1.5 bg-background border-2 border-primary rounded-full h-4.5 w-4.5 flex items-center justify-center">
                      <Clock className="h-2.5 w-2.5 text-primary" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm">{log.title}</span>
                        <Badge variant="outline" className="text-xs uppercase scale-90">
                          {log.module}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {dayjs(log.createdAt).format("MMM D, YYYY h:mm A")}
                        </span>
                      </div>
                      {log.description && (
                        <p className="text-sm text-muted-foreground">{log.description}</p>
                      )}
                      {(log.formattedOldValue || log.formattedNewValue) && (
                        <div className="mt-2 text-xs bg-muted/50 p-2.5 rounded-md border border-muted/50 font-mono grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl">
                          {log.formattedOldValue && (
                            <div>
                              <span className="text-destructive font-semibold">Before:</span>{" "}
                              <span>{log.formattedOldValue}</span>
                            </div>
                          )}
                          {log.formattedNewValue && (
                            <div>
                              <span className="text-emerald-600 font-semibold">After:</span>{" "}
                              <span>{log.formattedNewValue}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
